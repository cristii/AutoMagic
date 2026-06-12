import { IsObject } from 'class-validator';

export class SubmitMissionDto {
  @IsObject()
  payload!: Record<string, unknown>;
}
