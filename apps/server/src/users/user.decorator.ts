import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './entities/user.entity';

export const CurrentUser = createParamDecorator<unknown>(
  (_data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: User }>();
    return request.user;
  },
);
