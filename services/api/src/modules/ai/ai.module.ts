import { Module } from '@nestjs/common';

import { AiRunsService } from './ai-runs.service';
import { JsonOutputService } from './json-output.service';
import { MockAiProviderService } from './mock-ai-provider.service';

@Module({
  providers: [AiRunsService, JsonOutputService, MockAiProviderService],
  exports: [AiRunsService, JsonOutputService, MockAiProviderService],
})
export class AiModule {}
