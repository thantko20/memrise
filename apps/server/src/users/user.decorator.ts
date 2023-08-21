import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserEntity } from '@server/db/schemas';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: UserEntity }>();
    return request.user;
  },
);