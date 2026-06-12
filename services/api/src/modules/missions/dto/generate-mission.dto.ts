import { IsIn, IsInt, IsOptional, IsString, Max, Min, MinLength } from 'class-validator';

import type {
  MissionDifficulty,
  SandboxSkillKey,
  SandboxToolType,
} from '../../sandbox/sandbox.types';
import type { AiProviderName } from '../../ai-providers/byok-key.service';

export class GenerateMissionDto {
  @IsOptional()
  @IsIn(['anthropic', 'openai', 'deepseek'])
  provider?: AiProviderName;

  @IsIn(['inbox_calendar', 'research', 'crm_sheets', 'client_comms', 'ecommerce', 'automation'])
  skill!: SandboxSkillKey;

  @IsInt()
  @Min(1)
  @Max(3)
  difficulty!: MissionDifficulty;

  @IsIn(['inbox', 'calendar', 'crm', 'spreadsheet', 'support', 'ecommerce', 'automation'])
  toolType!: SandboxToolType;

  @IsInt()
  @Min(10)
  @Max(90)
  estMinutes!: number;

  @IsOptional()
  @IsString()
  @MinLength(3)
  twist?: string;
}
