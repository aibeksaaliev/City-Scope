import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/user.entity";
import { Repository } from "typeorm";
import { UserRequest } from "./types";
import { AuthService } from "./auth.service";

@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as UserRequest;
    const token = request.get('Authorization');

    if (!token) {
      return false;
    }

    const user = await this.userRepository.findOne({
      where: {
        token,
      },
    });

    if (!user) {
      return false;
    }

    request.user = user;

    return true;
  }
}
