import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserPreferencesService } from './user-preferences.service';
import { UserPreferencesController } from './user-preferences.controller';
import { UserPreferencesRepository } from './user-preferences.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserPreferencesRepository]),
  ],
  controllers: [UserPreferencesController],
  providers: [UserPreferencesService],
})
export class UserPreferencesModule {}
