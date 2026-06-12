import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  SandboxRoleGuard,
} from '../../common/auth/sandbox-role.guard';
import type { AuthenticatedSandboxRequest } from '../../common/auth/sandbox-role.guard';
import { CreateMissionDto } from './dto/create-mission.dto';
import { GenerateMissionDto } from './dto/generate-mission.dto';
import { SubmitMissionDto } from './dto/submit-mission.dto';
import { UpdateMissionStateDto } from './dto/update-mission-state.dto';
import { MissionsService } from './missions.service';

@Controller('missions')
@UseGuards(SandboxRoleGuard)
export class MissionsController {
  constructor(private readonly missionsService: MissionsService) {}

  @Get()
  list(@Req() request: AuthenticatedSandboxRequest) {
    return this.missionsService.list(request.sandboxUser.id);
  }

  @Post('generate')
  generate(@Req() request: AuthenticatedSandboxRequest, @Body() dto: GenerateMissionDto) {
    return this.missionsService.generatePreview(request.sandboxUser.id, dto);
  }

  @Post()
  create(@Req() request: AuthenticatedSandboxRequest, @Body() dto: CreateMissionDto) {
    return this.missionsService.create(request.sandboxUser.id, dto);
  }

  @Get(':id')
  get(@Req() request: AuthenticatedSandboxRequest, @Param('id') id: string) {
    return this.missionsService.findOne(request.sandboxUser.id, id);
  }

  @Patch(':id/state')
  updateState(
    @Req() request: AuthenticatedSandboxRequest,
    @Param('id') id: string,
    @Body() _dto: UpdateMissionStateDto,
  ) {
    return this.missionsService.updateState(request.sandboxUser.id, id);
  }

  @Post(':id/submit')
  submit(
    @Req() request: AuthenticatedSandboxRequest,
    @Param('id') id: string,
    @Body() dto: SubmitMissionDto,
  ) {
    return this.missionsService.submit(request.sandboxUser.id, id, dto.payload);
  }
}
