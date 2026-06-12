import { IsObject, IsString } from 'class-validator';

export class CoachHintDto {
  @IsString()
  missionId!: string;

  @IsObject()
  partialPayload!: Record<string, unknown>;
}
