import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoundsRepository } from './../rounds/rounds.repository';
import { RoundsService } from './../rounds/rounds.service';
import { UserFriendsService } from './user-friends.service';
import { UserFriendsController } from './user-friends.controller';
import { UserFriendsRepository } from './user-friends.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserFriendsRepository]),
    TypeOrmModule.forFeature([RoundsRepository]),
  ],
  controllers: [UserFriendsController],
  providers: [UserFriendsService, RoundsService],
})
export class UserFriendsModule {}
