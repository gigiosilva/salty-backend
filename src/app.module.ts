import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_GUARD } from '@nestjs/core';
import * as Joi from 'joi';

import DatabaseConfig from '../ormconfig';

import { FoodPlacesModule } from './food-places/food-places.module';
import { UsersModule } from './users/users.module';
import { AuthzModule } from './authz/authz.module';
import { UserAddressModule } from './user-address/user-addresses.module';
import { UserPreferencesModule } from './user-preferences/user-preferences.module';
import { RoundsModule } from './rounds/rounds.module';
import { FaqsModule } from './faqs/faqs.module';
import { RoundUsersModule } from './round-users/round-users.module';
import { JwtAuthGuard } from './authz/jwt-auth.guard';
import { ThirdPartyModule } from './third-party/third-party.module';
import CloudinaryProvider from './third-party/cloudinary.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_URL: Joi.required(),
        NODE_ENV: Joi.required(),
        PORT: Joi.required(),
      }),
    }),
    TypeOrmModule.forRoot(DatabaseConfig),
    ScheduleModule.forRoot(),
    FoodPlacesModule,
    UsersModule,
    AuthzModule,
    UserAddressModule,
    UserPreferencesModule,
    RoundsModule,
    FaqsModule,
    RoundUsersModule,
    ThirdPartyModule,
  ],
  providers: [
    CloudinaryProvider,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
