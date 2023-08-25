import { z } from 'zod';

export const addCardToCollectionBodySchema = z.object({
  front: z.string().min(1),
  back: z.string().min(1),
  description: z.string().optional(),
});

export type AddCardToCollectionDto = z.infer<
  typeof addCardToCollectionBodySchema
>;
