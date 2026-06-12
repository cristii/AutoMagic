import { Module } from '@nestjs/common';

import { AiModule } from '../ai/ai.module';
import { AiProvidersModule } from '../ai-providers/ai-providers.module';
import { ProgressionModule } from '../progression/progression.module';
import { MissionsController } from './missions.controller';
import { MissionsService } from './missions.service';

@Module({
  imports: [AiModule, AiProvidersModule, ProgressionModule],
  controllers: [MissionsController],
  providers: [MissionsService],
  exports: [MissionsService],
})
export class MissionsModule {}
