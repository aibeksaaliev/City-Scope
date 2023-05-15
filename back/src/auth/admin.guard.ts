import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';
import { UserRequest } from './types';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as UserRequest;
    const user = request.user as User | undefined;
    if (!user) {
      throw new Error('You dont have permission to perform this operation');
    }
    return user.role === 'admin';
  }
}
