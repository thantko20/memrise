import { Card } from '@server/cards/entities/card.entity';
import { Collection } from '@server/collections/entities/collection.entity';
import { User } from '@server/users/entities/user.entity';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config({ path: './.env' });

export const typeormConfig: DataSourceOptions = {
  username: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'memrise',
  entities: [User, Collection, Card],
  type: 'postgres',
  logging: 'all',
  migrationsTableName: 'migrations_typeorm',
  migrations: ['dist/db-migrations/*.{js,ts}'],
  synchronize: false,
};

const dataSource = new DataSource(typeormConfig);

export default dataSource;
