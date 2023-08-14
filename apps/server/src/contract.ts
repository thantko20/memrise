import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

const HelloSchema = z.object({
  message: z.string(),
});

const helloContract = c.router(
  {
    sayHello: {
      method: 'GET',
      path: '/hello',
      responses: {
        200: HelloSchema,
      },
      summary: 'Say hello',
    },
  },
  {
    pathPrefix: '/test',
  },
);

export const contract = c.router(
  {
    hello: helloContract,
  },
  {
    pathPrefix: '/api',
  },
);
