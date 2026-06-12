import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

export type SandboxRole = 'va' | 'admin' | 'client' | 'public';

export type SandboxUser = {
  id: string;
  role: SandboxRole;
};

export type AuthenticatedSandboxRequest = Request & {
  sandboxUser: SandboxUser;
};

@Injectable()
export class SandboxRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedSandboxRequest>();
    const roleHeader = request.header('x-automagic-role');
    const userId = request.header('x-automagic-user-id') ?? 'dev-va-user';

    if (!roleHeader) {
      throw new UnauthorizedException({
        message: 'Authentication required',
        redirect: '/login',
      });
    }

    if (roleHeader !== 'va' && roleHeader !== 'admin') {
      throw new ForbiddenException('Sandbox is restricted to VA and admin roles.');
    }

    request.sandboxUser = {
      id: userId,
      role: roleHeader,
    };

    return true;
  }
}
