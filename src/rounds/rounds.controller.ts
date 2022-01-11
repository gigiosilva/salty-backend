import {
  Controller, Get, Post, Body, Put, Param, Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RoundsService } from './rounds.service';
import { CreateRoundDto } from './dto/create-round.dto';
import { UpdateRoundDto } from './dto/update-round.dto';

@ApiTags('Rounds')
@Controller('rounds')
export class RoundsController {
  constructor(private readonly roundsService: RoundsService) {}

  @Post()
  create(@Body() createRoundDto: CreateRoundDto) {
    return this.roundsService.create(createRoundDto);
  }

  @Get()
  getRounds() {
    return this.roundsService.getAllRounds();
  }

  @Get(':id')
  getRoundById(@Param('id') id: string) {
    return this.roundsService.getRoundById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoundDto: UpdateRoundDto) {
    return this.roundsService.updateRound(id, updateRoundDto);
  }

  @Delete(':id')
  deleteRound(@Param('id') id: string) {
    return this.roundsService.remove(id);
  }
}
