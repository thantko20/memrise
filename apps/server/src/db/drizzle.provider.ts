import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import { FactoryProvider, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type DB = NodePgDatabase;

export const db: FactoryProvider<DB> = {
  provide: 'DATABASE_CONNECTION',
  inject: [ConfigService],
  useFactory: async function (configService: ConfigService) {
    const logger = new Logger('DATABASE');
    const uri = configService.get('db_connection');

    const client = new Pool({
      connectionString: uri,
      ssl: true,
    });
    return drizzle(client);
  },
};

export class DrizzleService {}
