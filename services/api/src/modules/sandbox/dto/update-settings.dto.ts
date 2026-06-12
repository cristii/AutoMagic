import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateSettingsDto {
  @IsOptional()
  @IsBoolean()
  liveCoachHints?: boolean;

  @IsOptional()
  @IsBoolean()
  timedMissions?: boolean;

  @IsOptional()
  @IsBoolean()
  adaptiveDifficulty?: boolean;
}
