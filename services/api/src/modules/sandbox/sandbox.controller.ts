import { Body, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';

import {
  SandboxRoleGuard,
} from '../../common/auth/sandbox-role.guard';
import type { AuthenticatedSandboxRequest } from '../../common/auth/sandbox-role.guard';
import { UpdatePortfolioItemDto } from './dto/update-portfolio-item.dto';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { SandboxService } from './sandbox.service';

@Controller()
@UseGuards(SandboxRoleGuard)
export class SandboxController {
  constructor(private readonly sandboxService: SandboxService) {}

  @Get('sandbox/dashboard')
  dashboard(@Req() request: AuthenticatedSandboxRequest) {
    return this.sandboxService.getDashboard(request.sandboxUser.id);
  }

  @Get('sandbox/skills')
  skills() {
    return this.sandboxService.getSkills();
  }

  @Get('achievements')
  achievements(@Req() request: AuthenticatedSandboxRequest) {
    return this.sandboxService.getAchievements(request.sandboxUser.id);
  }

  @Get('portfolio')
  portfolio(@Req() request: AuthenticatedSandboxRequest) {
    return this.sandboxService.getPortfolio(request.sandboxUser.id);
  }

  @Patch('portfolio/:id')
  updatePortfolioItem(
    @Req() request: AuthenticatedSandboxRequest,
    @Param('id') id: string,
    @Body() dto: UpdatePortfolioItemDto,
  ) {
    return this.sandboxService.updatePortfolioItem(request.sandboxUser.id, id, dto.isPublic);
  }

  @Get('settings')
  settings(@Req() request: AuthenticatedSandboxRequest) {
    return this.sandboxService.getSettings(request.sandboxUser.id);
  }

  @Patch('settings')
  updateSettings(@Req() request: AuthenticatedSandboxRequest, @Body() dto: UpdateSettingsDto) {
    return this.sandboxService.updateSettings(request.sandboxUser.id, dto);
  }
}
