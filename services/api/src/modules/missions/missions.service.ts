import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { AiRunsService } from '../ai/ai-runs.service';
import { MockAiProviderService } from '../ai/mock-ai-provider.service';
import { ByokKeyService } from '../ai-providers/byok-key.service';
import type { AiProviderName } from '../ai-providers/byok-key.service';
import { ProgressionService } from '../progression/progression.service';
import type {
  SandboxGrading,
  SandboxMission,
  SandboxSubmission,
} from '../sandbox/sandbox.types';
import type { CreateMissionDto } from './dto/create-mission.dto';
import type { GenerateMissionDto } from './dto/generate-mission.dto';

@Injectable()
export class MissionsService {
  private readonly missions: SandboxMission[] = [];
  private readonly submissions: SandboxSubmission[] = [];
  private readonly gradings: SandboxGrading[] = [];

  constructor(
    private readonly byokKeyService: ByokKeyService,
    private readonly aiProvider: MockAiProviderService,
    private readonly aiRunsService: AiRunsService,
    private readonly progressionService: ProgressionService,
  ) {}

  list(userId: string): SandboxMission[] {
    return this.missions.filter((mission) => mission.userId === userId);
  }

  async generatePreview(userId: string, input: GenerateMissionDto) {
    const resolvedKey = this.byokKeyService.resolveDefault(userId, input.provider);
    const startedAt = Date.now();
    const generated = await this.aiProvider.generateMission({
      userId,
      provider: resolvedKey.provider,
      model: resolvedKey.defaultModel,
      skill: input.skill,
      difficulty: input.difficulty,
      toolType: input.toolType,
      estMinutes: input.estMinutes,
      twist: input.twist,
    });

    this.aiRunsService.record({
      userId,
      kind: 'generate',
      provider: resolvedKey.provider,
      model: resolvedKey.defaultModel,
      tokensIn: 400,
      tokensOut: 700,
      latencyMs: Date.now() - startedAt,
    });

    return {
      ...generated,
      generatedByProvider: resolvedKey.provider,
      generatedByModel: resolvedKey.defaultModel,
    };
  }

  create(userId: string, input: CreateMissionDto): SandboxMission {
    const mission: SandboxMission = {
      id: randomUUID(),
      userId,
      title: input.title,
      brief: input.brief,
      skill: input.skill,
      difficulty: input.difficulty,
      toolType: input.toolType,
      status: 'new',
      source: 'generated',
      xpReward: input.xpReward,
      estMinutes: input.estMinutes,
      objectives: input.objectives.map((objective, index) => ({
        id: `objective-${index + 1}`,
        text: objective.text,
        done: false,
      })),
      toolSeed: {},
      createdAt: new Date().toISOString(),
    };

    this.missions.push(mission);
    return mission;
  }

  findOne(userId: string, missionId: string): SandboxMission {
    const mission = this.missions.find(
      (candidate) => candidate.userId === userId && candidate.id === missionId,
    );
    if (!mission) throw new NotFoundException('Mission not found.');
    return mission;
  }

  updateState(userId: string, missionId: string): SandboxMission {
    const mission = this.findOne(userId, missionId);
    if (mission.status === 'new') mission.status = 'in_progress';
    return mission;
  }

  async submit(userId: string, missionId: string, payload: Record<string, unknown>) {
    const mission = this.findOne(userId, missionId);
    const resolvedKey = this.byokKeyService.resolveDefault(
      userId,
      isAiProviderName(mission.generatedByProvider) ? mission.generatedByProvider : undefined,
    );
    const submission: SandboxSubmission = {
      id: randomUUID(),
      missionId,
      userId,
      payload,
      submittedAt: new Date().toISOString(),
    };

    this.submissions.push(submission);
    mission.status = 'submitted';

    const startedAt = Date.now();
    const result = await this.aiProvider.gradeSubmission({
      userId,
      missionId,
      objectives: mission.objectives.map((objective) => ({
        id: objective.id,
        text: objective.text,
      })),
      payload,
    });

    const grading: SandboxGrading = {
      id: randomUUID(),
      submissionId: submission.id,
      provider: resolvedKey.provider,
      model: resolvedKey.defaultModel,
      score: result.score,
      perObjective: result.perObjective,
      strengths: result.strengths,
      issues: result.issues,
      strongerAnswer: result.strongerAnswer,
      createdAt: new Date().toISOString(),
    };

    this.gradings.push(grading);
    mission.status = 'graded';

    this.aiRunsService.record({
      userId,
      kind: 'grade',
      provider: resolvedKey.provider,
      model: resolvedKey.defaultModel,
      missionId,
      tokensIn: 650,
      tokensOut: 520,
      latencyMs: Date.now() - startedAt,
    });

    const progression = this.progressionService.applyMissionGraded(mission, grading);
    return { submission, grading, progression };
  }

  getGradingForSubmission(userId: string, submissionId: string): SandboxGrading {
    const submission = this.submissions.find(
      (candidate) => candidate.userId === userId && candidate.id === submissionId,
    );
    if (!submission) throw new NotFoundException('Submission not found.');

    const grading = this.gradings.find((candidate) => candidate.submissionId === submissionId);
    if (!grading) throw new BadRequestException('Submission has not been graded yet.');

    return grading;
  }
}

function isAiProviderName(value: string | undefined): value is AiProviderName {
  return value === 'anthropic' || value === 'openai' || value === 'deepseek';
}
