import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserRequest } from './types';
import { User } from '../users/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as UserRequest;
    const user = request.user as User | undefined;
    return user.role === 'admin';
  }
}
