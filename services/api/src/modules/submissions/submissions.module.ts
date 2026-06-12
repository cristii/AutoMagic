import { Module } from '@nestjs/common';

import { MissionsModule } from '../missions/missions.module';
import { SubmissionsController } from './submissions.controller';

@Module({
  imports: [MissionsModule],
  controllers: [SubmissionsController],
})
export class SubmissionsModule {}
