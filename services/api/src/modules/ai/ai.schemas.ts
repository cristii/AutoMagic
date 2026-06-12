import type {
  MissionDifficulty,
  SandboxSkillKey,
  SandboxToolType,
} from '../sandbox/sandbox.types';

export type GenerateMissionInput = {
  userId: string;
  provider?: string;
  model?: string;
  skill: SandboxSkillKey;
  difficulty: MissionDifficulty;
  toolType: SandboxToolType;
  estMinutes: number;
  twist?: string;
};

export type GeneratedMission = {
  title: string;
  brief: string;
  skill: SandboxSkillKey;
  difficulty: MissionDifficulty;
  toolType: SandboxToolType;
  estMinutes: number;
  xpReward: number;
  objectives: Array<{ text: string }>;
  toolSeed: Record<string, unknown>;
};

export type GradeInput = {
  userId: string;
  missionId: string;
  objectives: Array<{ id: string; text: string }>;
  payload: Record<string, unknown>;
};

export type GradingResult = {
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
};

export type CoachInput = {
  userId: string;
  missionId: string;
  partialPayload: Record<string, unknown>;
};

export type CoachResponse = {
  score: number;
  strengths: string[];
  issues: string[];
  strongerAnswer: string;
};

const skillKeys: readonly SandboxSkillKey[] = [
  'inbox_calendar',
  'research',
  'crm_sheets',
  'client_comms',
  'ecommerce',
  'automation',
];

const toolTypes: readonly SandboxToolType[] = [
  'inbox',
  'calendar',
  'crm',
  'spreadsheet',
  'support',
  'ecommerce',
  'automation',
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readString(record: Record<string, unknown>, key: string): string {
  const value = record[key];
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`Expected ${key} to be a non-empty string.`);
  }
  return value;
}

function readNumber(record: Record<string, unknown>, key: string): number {
  const value = record[key];
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error(`Expected ${key} to be a finite number.`);
  }
  return value;
}

function readStringArray(record: Record<string, unknown>, key: string): string[] {
  const value = record[key];
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
    throw new Error(`Expected ${key} to be a string array.`);
  }
  return value;
}

function assertDifficulty(value: number): MissionDifficulty {
  if (value === 1 || value === 2 || value === 3) return value;
  throw new Error('Expected difficulty to be 1, 2, or 3.');
}

function assertScore(value: number): number {
  if (value >= 0 && value <= 100) return value;
  throw new Error('Expected score to be between 0 and 100.');
}

function assertSkill(value: string): SandboxSkillKey {
  if (skillKeys.includes(value as SandboxSkillKey)) return value as SandboxSkillKey;
  throw new Error(`Unknown sandbox skill: ${value}.`);
}

function assertTool(value: string): SandboxToolType {
  if (toolTypes.includes(value as SandboxToolType)) return value as SandboxToolType;
  throw new Error(`Unknown sandbox tool type: ${value}.`);
}

export function parseGeneratedMission(value: unknown): GeneratedMission {
  if (!isRecord(value)) throw new Error('Generated mission must be an object.');

  const objectives = value.objectives;
  if (!Array.isArray(objectives)) {
    throw new Error('Generated mission objectives must be an array.');
  }

  const toolSeed = value.tool_seed ?? value.toolSeed;
  if (!isRecord(toolSeed)) {
    throw new Error('Generated mission tool_seed must be an object.');
  }

  return {
    title: readString(value, 'title'),
    brief: readString(value, 'brief'),
    skill: assertSkill(readString(value, 'skill')),
    difficulty: assertDifficulty(readNumber(value, 'difficulty')),
    toolType: assertTool(readString(value, 'tool_type')),
    estMinutes: readNumber(value, 'est_minutes'),
    xpReward: readNumber(value, 'xp_reward'),
    objectives: objectives.map((objective, index) => {
      if (!isRecord(objective)) {
        throw new Error(`Objective ${index} must be an object.`);
      }

      return { text: readString(objective, 'text') };
    }),
    toolSeed,
  };
}

export function parseGrading(value: unknown): GradingResult {
  if (!isRecord(value)) throw new Error('Grading must be an object.');

  const perObjective = value.per_objective ?? value.perObjective;
  if (!Array.isArray(perObjective)) {
    throw new Error('Grading per_objective must be an array.');
  }

  return {
    score: assertScore(readNumber(value, 'score')),
    perObjective: perObjective.map((objective, index) => {
      if (!isRecord(objective)) {
        throw new Error(`Per-objective grade ${index} must be an object.`);
      }

      const met = objective.met;
      if (typeof met !== 'boolean') {
        throw new Error(`Per-objective grade ${index} met must be boolean.`);
      }

      return {
        objectiveId: readString(objective, 'objective_id'),
        met,
        score: assertScore(readNumber(objective, 'score')),
        note: readString(objective, 'note'),
      };
    }),
    strengths: readStringArray(value, 'strengths'),
    issues: readStringArray(value, 'issues'),
    strongerAnswer: readString(value, 'stronger_answer'),
  };
}
