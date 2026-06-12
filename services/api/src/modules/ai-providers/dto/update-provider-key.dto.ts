import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateProviderKeyDto {
  @IsOptional()
  @IsString()
  @MinLength(8)
  apiKey?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  defaultModel?: string;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
