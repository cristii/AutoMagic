import { IsBoolean, IsInt, IsObject, IsOptional, Min } from 'class-validator';

export class UpdateMissionStateDto {
  @IsOptional()
  @IsObject()
  toolSnapshot?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  objectives?: Record<string, boolean>;

  @IsInt()
  @Min(0)
  elapsedSeconds!: number;
}
