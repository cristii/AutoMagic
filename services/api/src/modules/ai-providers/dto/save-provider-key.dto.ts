import { IsBoolean, IsIn, IsOptional, IsString, MinLength } from 'class-validator';

import type { AiProviderName } from '../byok-key.service';

export class SaveProviderKeyDto {
  @IsIn(['anthropic', 'openai', 'deepseek'])
  provider!: AiProviderName;

  @IsString()
  @MinLength(8)
  apiKey!: string;

  @IsString()
  @MinLength(2)
  defaultModel!: string;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
