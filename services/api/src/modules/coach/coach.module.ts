import { Module } from '@nestjs/common';

import { AiModule } from '../ai/ai.module';
import { AiProvidersModule } from '../ai-providers/ai-providers.module';
import { CoachController } from './coach.controller';

@Module({
  imports: [AiModule, AiProvidersModule],
  controllers: [CoachController],
})
export class CoachModule {}
