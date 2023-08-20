import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import { FactoryProvider, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type DB = NodePgDatabase;

export const db: FactoryProvider<DB> = {
  provide: 'DATABASE_CONNECTION',
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const logger = new Logger('DATABASE');
    const uri = configService.get('db_connection');

    const client = new Pool({
      connectionString: uri,
      ssl: true,
    });

    logger.log('Connecting to database');
    await client.connect();
    logger.log('Connected to database');

    const drizzleDb = drizzle(client);
    logger.log('Running migrations');
    await migrate(drizzleDb, { migrationsFolder: './migrations' });
    logger.log('Migrations completed');

    return drizzleDb;
  },
};

export class DrizzleService {}
