import { Injectable } from '@nestjs/common';

import type { AiProvider } from './ai-provider.interface';
import type {
  CoachInput,
  CoachResponse,
  GeneratedMission,
  GenerateMissionInput,
  GradeInput,
  GradingResult,
} from './ai.schemas';

@Injectable()
export class MockAiProviderService implements AiProvider {
  async generateMission(input: GenerateMissionInput): Promise<GeneratedMission> {
    return {
      title: 'Triage a 40-email backlog after a week off',
      brief:
        'Sort, prioritise, draft urgent replies, and book callbacks without missing the hidden invoice dispute.',
      skill: input.skill,
      difficulty: input.difficulty,
      toolType: input.toolType,
      estMinutes: input.estMinutes,
      xpReward: input.difficulty * 60,
      objectives: [
        { text: 'Label and archive low-priority mail' },
        { text: 'Draft replies to urgent threads' },
        { text: 'Book callbacks on the calendar' },
        { text: 'Flag the invoice dispute to the client' },
      ],
      toolSeed: {
        scenario: input.twist ?? 'Client returned from holiday.',
      },
    };
  }

  async gradeSubmission(input: GradeInput): Promise<GradingResult> {
    return {
      score: 88,
      perObjective: input.objectives.map((objective) => ({
        objectiveId: objective.id,
        met: true,
        score: 88,
        note: `Accepted: ${objective.text}`,
      })),
      strengths: ['Prioritised urgent client work first.', 'Produced a concise client-ready output.'],
      issues: ['Double-check hidden escalation items before final submission.'],
      strongerAnswer:
        'Lead with the highest-risk client issue, state the next action, and make the escalation explicit.',
    };
  }

  async coachHint(_input: CoachInput): Promise<CoachResponse> {
    return {
      score: 71,
      strengths: ['Good prioritisation so far.'],
      issues: ['One invoice dispute still needs escalation.'],
      strongerAnswer: 'Mention the dispute first and propose a callback window.',
    };
  }
}
