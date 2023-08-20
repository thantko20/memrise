import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import { FactoryProvider, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type DB = NodePgDatabase;

export const db: FactoryProvider = {
  provide: 'database',
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const logger = new Logger('database');
    const uri = configService.get('db_connection');

    const client = new Pool({
      connectionString: uri,
      ssl: true,
    });
    await client.connect();
    logger.log('Connected to database');

    const drizzleDb = drizzle(client);
    await migrate(drizzleDb, { migrationsFolder: './migrations' });
    logger.log('Migration completed');

    return drizzleDb;
  },
};

export class DrizzleService {}
