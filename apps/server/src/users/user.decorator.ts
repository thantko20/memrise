import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserEntity } from '@server/db/schemas';

export const CurrentUser = createParamDecorator<unknown>(
  (_data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: UserEntity }>();
    return request.user;
  },
);
