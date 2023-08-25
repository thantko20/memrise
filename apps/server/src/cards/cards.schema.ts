import { z } from 'zod';

export const createCardSchemaBody = z.object({
  front: z.string().min(1),
  back: z.string().min(1),
  description: z.string().optional(),
  collectionId: z.string().uuid(),
});

export type CreateCardDto = z.infer<typeof createCardSchemaBody>;
