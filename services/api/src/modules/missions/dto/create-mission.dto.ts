import { IsIn, IsInt, IsString, Max, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import type {
  MissionDifficulty,
  SandboxSkillKey,
  SandboxToolType,
} from '../../sandbox/sandbox.types';

class CreateMissionObjectiveDto {
  @IsString()
  text!: string;
}

export class CreateMissionDto {
  @IsString()
  title!: string;

  @IsString()
  brief!: string;

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

  @IsInt()
  @Min(1)
  xpReward!: number;

  @ValidateNested({ each: true })
  @Type(() => CreateMissionObjectiveDto)
  objectives!: CreateMissionObjectiveDto[];
}
