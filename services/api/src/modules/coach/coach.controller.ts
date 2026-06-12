import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import {
  SandboxRoleGuard,
} from '../../common/auth/sandbox-role.guard';
import type { AuthenticatedSandboxRequest } from '../../common/auth/sandbox-role.guard';
import { AiRunsService } from '../ai/ai-runs.service';
import { MockAiProviderService } from '../ai/mock-ai-provider.service';
import { ByokKeyService } from '../ai-providers/byok-key.service';
import { CoachHintDto } from './dto/coach-hint.dto';

@Controller('coach')
@UseGuards(SandboxRoleGuard)
export class CoachController {
  constructor(
    private readonly byokKeyService: ByokKeyService,
    private readonly aiProvider: MockAiProviderService,
    private readonly aiRunsService: AiRunsService,
  ) {}

  @Post('hint')
  async hint(@Req() request: AuthenticatedSandboxRequest, @Body() dto: CoachHintDto) {
    const resolvedKey = this.byokKeyService.resolveDefault(request.sandboxUser.id);
    const startedAt = Date.now();
    const response = await this.aiProvider.coachHint({
      userId: request.sandboxUser.id,
      missionId: dto.missionId,
      partialPayload: dto.partialPayload,
    });

    this.aiRunsService.record({
      userId: request.sandboxUser.id,
      kind: 'coach',
      provider: resolvedKey.provider,
      model: resolvedKey.defaultModel,
      missionId: dto.missionId,
      tokensIn: 180,
      tokensOut: 180,
      latencyMs: Date.now() - startedAt,
    });

    return response;
  }
}
