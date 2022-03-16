import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoundsRepository } from '../rounds/rounds.repository';
import { RoundsService } from '../rounds/rounds.service';

import { RoundUsersService } from './round-users.service';
import { RoundUsersController } from './round-users.controller';
import { RoundUsersRepository } from './round-users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoundUsersRepository]),
    TypeOrmModule.forFeature([RoundsRepository]),
  ],
  controllers: [RoundUsersController],
  providers: [RoundUsersService, RoundsService],
  exports: [RoundUsersService],
})
export class RoundUsersModule {}
