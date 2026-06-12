import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';

import {
  SandboxRoleGuard,
} from '../../common/auth/sandbox-role.guard';
import type { AuthenticatedSandboxRequest } from '../../common/auth/sandbox-role.guard';
import { MissionsService } from '../missions/missions.service';

@Controller('submissions')
@UseGuards(SandboxRoleGuard)
export class SubmissionsController {
  constructor(private readonly missionsService: MissionsService) {}

  @Get(':id/grading')
  getGrading(@Req() request: AuthenticatedSandboxRequest, @Param('id') id: string) {
    return this.missionsService.getGradingForSubmission(request.sandboxUser.id, id);
  }
}
