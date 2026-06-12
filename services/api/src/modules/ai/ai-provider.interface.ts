import type {
  CoachInput,
  CoachResponse,
  GeneratedMission,
  GenerateMissionInput,
  GradeInput,
  GradingResult,
} from './ai.schemas';

export interface AiProvider {
  generateMission(input: GenerateMissionInput): Promise<GeneratedMission>;
  gradeSubmission(input: GradeInput): Promise<GradingResult>;
  coachHint(input: CoachInput): Promise<CoachResponse>;
}
