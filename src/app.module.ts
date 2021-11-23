import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';

import DatabaseConfig from '../ormconfig';

import { FoodPlacesModule } from './food-places/food-places.module';
import { UsersModule } from './users/users.module';
import { AuthzModule } from './authz/authz.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.required(),
        PORT: Joi.required(),
        DATABASE_URL: Joi.required(),
      }),
    }),
    TypeOrmModule.forRoot(DatabaseConfig),
    FoodPlacesModule,
    UsersModule,
    AuthzModule,
  ],
})
export class AppModule {}
