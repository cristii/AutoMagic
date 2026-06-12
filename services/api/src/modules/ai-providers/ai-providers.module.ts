import { Module } from '@nestjs/common';

import { AiProvidersController } from './ai-providers.controller';
import { ByokKeyService } from './byok-key.service';

@Module({
  controllers: [AiProvidersController],
  providers: [ByokKeyService],
  exports: [ByokKeyService],
})
export class AiProvidersModule {}
