import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiProvidersModule } from './modules/ai-providers/ai-providers.module';
import { CoachModule } from './modules/coach/coach.module';
import { MissionsModule } from './modules/missions/missions.module';
import { SandboxModule } from './modules/sandbox/sandbox.module';
import { SubmissionsModule } from './modules/submissions/submissions.module';

@Module({
  imports: [
    AiProvidersModule,
    CoachModule,
    MissionsModule,
    SandboxModule,
    SubmissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
