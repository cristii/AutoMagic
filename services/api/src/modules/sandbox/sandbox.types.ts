export type SandboxSkillKey =
  | 'inbox_calendar'
  | 'research'
  | 'crm_sheets'
  | 'client_comms'
  | 'ecommerce'
  | 'automation';

export type SandboxToolType =
  | 'inbox'
  | 'calendar'
  | 'crm'
  | 'spreadsheet'
  | 'support'
  | 'ecommerce'
  | 'automation';

export type MissionDifficulty = 1 | 2 | 3;

export type MissionStatus = 'draft' | 'new' | 'in_progress' | 'submitted' | 'graded';

export type MissionObjective = {
  id: string;
  text: string;
  done: boolean;
};

export type SandboxMission = {
  id: string;
  userId: string;
  skill: SandboxSkillKey;
  title: string;
  brief: string;
  difficulty: MissionDifficulty;
  toolType: SandboxToolType;
  status: MissionStatus;
  source: 'generated' | 'curated';
  generatedByProvider?: string;
  generatedByModel?: string;
  xpReward: number;
  estMinutes: number;
  objectives: MissionObjective[];
  toolSeed: Record<string, unknown>;
  createdAt: string;
};

export type SandboxSubmission = {
  id: string;
  missionId: string;
  userId: string;
  payload: Record<string, unknown>;
  submittedAt: string;
};

export type SandboxGrading = {
  id: string;
  submissionId: string;
  provider: string;
  model: string;
  score: number;
  perObjective: Array<{
    objectiveId: string;
    met: boolean;
    score: number;
    note: string;
  }>;
  strengths: string[];
  issues: string[];
  strongerAnswer: string;
  createdAt: string;
};
