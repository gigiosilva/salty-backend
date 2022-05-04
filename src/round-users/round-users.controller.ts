import {
  Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors, UploadedFile,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

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

  @Post(':userId/photo')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadGift(
    @Param('userId') userId: string,
    @Param('roundId') roundId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.roundUsersService.uploadGift(userId, roundId, file);
  }
}
