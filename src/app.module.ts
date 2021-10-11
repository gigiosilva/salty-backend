import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';

import { FoodPlacesModule } from './food-places/food-places.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.required(),
        PORT: Joi.required(),
        DATABASE_URL: Joi.required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...(process.env.NODE_ENV !== 'dev' && {
        ssl: true,
        extra: {
          ssl: { rejectUnauthorized: false },
        },
      }),
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    FoodPlacesModule,
  ],
})
export class AppModule {}
