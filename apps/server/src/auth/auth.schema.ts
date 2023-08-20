import { z } from 'zod';

export const loginUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginUserDto = z.infer<typeof loginUserBodySchema>;

export const registerUserBodySchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(1),
    confirmPassword: z.string().min(6),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword);

export type RegisterUserDto = z.infer<typeof registerUserBodySchema>;
