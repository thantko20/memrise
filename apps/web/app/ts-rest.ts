import { initClient } from '@ts-rest/core';
import { initQueryClient } from '@ts-rest/react-query';
import { contract } from '@server/contract';

export const client = initQueryClient(contract, {
  baseUrl: 'http://localhost:4000',
  baseHeaders: {},
});
