import {
  Controller, Get, Post, Body, Param, Delete, Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserFriendsService } from './user-friends.service';
import { UpdateUserFriendDto } from './dto/update-user-friend.dto';

@ApiTags('User Friends')
@Controller('users/:userId/rounds/:roundId')
export class UserFriendsController {
  constructor(private readonly userFriendsService: UserFriendsService) {}

  @Post()
  create(
    @Param('userId') userId: string,
    @Param('roundId') roundId: string,
  ) {
    return this.userFriendsService.create(userId, roundId);
  }

  @Get()
  findOne(
    @Param('userId') userId: string,
    @Param('roundId') roundId: string,
  ) {
    return this.userFriendsService.findOne(userId, roundId);
  }

  @Put()
  update(
    @Param('userId') userId: string,
    @Param('roundId') roundId: string,
    @Body() updateUserFriendDto: UpdateUserFriendDto,
  ) {
    return this.userFriendsService.update(userId, roundId, updateUserFriendDto);
  }

  @Delete()
  remove(
    @Param('userId') userId: string,
    @Param('roundId') roundId: string,
  ) {
    return this.userFriendsService.remove(userId, roundId);
  }
}
