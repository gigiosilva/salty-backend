import {
  Controller, Get, Post, Body, Param, Delete, Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RoundUsersService } from './round-users.service';
import { UpdateRoundUserDto } from './dto/update-round-user.dto';
import { CreateRoundUserDto } from './dto/create-round-user.dto';

@ApiTags('Round Users')
@Controller('/rounds/:roundId/users')
export class RoundUsersController {
  constructor(private readonly roundUsersService: RoundUsersService) {}

  @Post(':userId')
  create(
    @Param('userId') userId: string,
    @Param('roundId') roundId: string,
    @Body() createRoundUserDto: CreateRoundUserDto,
  ) {
    return this.roundUsersService.create(userId, roundId, createRoundUserDto);
  }

  @Get(':userId')
  findOne(
    @Param('userId') userId: string,
    @Param('roundId') roundId: string,
  ) {
    return this.roundUsersService.findOne(userId, roundId);
  }

  @Get()
  findAll(
    @Param('roundId') roundId: string,
  ) {
    return this.roundUsersService.findAll(roundId);
  }

  @Put(':userId')
  update(
    @Param('userId') userId: string,
    @Param('roundId') roundId: string,
    @Body() updateRoundUserDto: UpdateRoundUserDto,
  ) {
    return this.roundUsersService.update(userId, roundId, updateRoundUserDto);
  }

  @Delete(':userId')
  remove(
    @Param('userId') userId: string,
    @Param('roundId') roundId: string,
  ) {
    return this.roundUsersService.remove(userId, roundId);
  }
}
