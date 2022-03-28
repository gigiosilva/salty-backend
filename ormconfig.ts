import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export default {
  type: 'postgres',
  ...(process.env.NODE_ENV !== 'dev' && {
    ssl: true,
    extra: {
      ssl: { rejectUnauthorized: false },
    },
  }),
  host: process.env.POSTGRES_HOST || 'postgres-db',
  port: +process.env.POSTGRES_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'saltydb',
  autoLoadEntities: true,
  migrations: [`${__dirname}/src/migration/*.{ts,js}`],
  entities: [`${__dirname}/src/**/*.entity.{ts,js}`],
  cli: {
    migrationsDir: 'src/migration',
  },
  synchronize: false,
  migrationsRun: true,
} as TypeOrmModuleOptions;
