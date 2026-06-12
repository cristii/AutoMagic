import {
  Body,
  Controller,
  Delete,
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
import { ByokKeyService } from './byok-key.service';
import { SaveProviderKeyDto } from './dto/save-provider-key.dto';
import { UpdateProviderKeyDto } from './dto/update-provider-key.dto';

@Controller('ai/providers')
@UseGuards(SandboxRoleGuard)
export class AiProvidersController {
  constructor(private readonly byokKeyService: ByokKeyService) {}

  @Get()
  list(@Req() request: AuthenticatedSandboxRequest) {
    return this.byokKeyService.list(request.sandboxUser.id);
  }

  @Post()
  save(@Req() request: AuthenticatedSandboxRequest, @Body() dto: SaveProviderKeyDto) {
    return this.byokKeyService.save({
      userId: request.sandboxUser.id,
      provider: dto.provider,
      apiKey: dto.apiKey,
      defaultModel: dto.defaultModel,
      isDefault: dto.isDefault,
    });
  }

  @Patch(':id')
  update(
    @Req() request: AuthenticatedSandboxRequest,
    @Param('id') id: string,
    @Body() dto: UpdateProviderKeyDto,
  ) {
    return this.byokKeyService.update(request.sandboxUser.id, id, dto);
  }

  @Delete(':id')
  remove(@Req() request: AuthenticatedSandboxRequest, @Param('id') id: string) {
    this.byokKeyService.delete(request.sandboxUser.id, id);
    return { deleted: true };
  }
}
