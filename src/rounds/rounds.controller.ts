import {
  Controller, Get, Post, Body, Put, Param, Delete, OnApplicationBootstrap,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RoundsService } from './rounds.service';
import { CreateRoundDto } from './dto/create-round.dto';
import { UpdateRoundDto } from './dto/update-round.dto';
import { RoundSchedulerService } from './round-scheduler.service';
import { Round } from './round.entity';

@ApiTags('Rounds')
@Controller('rounds')
export class RoundsController implements OnApplicationBootstrap {
  constructor(
    private readonly roundsService: RoundsService,
    private readonly roundSchedulerService: RoundSchedulerService,
  ) {}

  async onApplicationBootstrap() {
    const rounds: Round[] = await this.roundsService.getActiveRounds();
    this.roundSchedulerService.initRoundSchedules(rounds);
    this.roundsService.deactiveOldRounds(rounds);
  }

  @Post()
  async create(@Body() createRoundDto: CreateRoundDto) {
    const round = await this.roundsService.create(createRoundDto);
    this.roundSchedulerService.scheduleRound(round);

    return round;
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
  async deleteRound(@Param('id') id: string) {
    await this.roundsService.remove(id);
    this.roundSchedulerService.cancelScheduledRound(id);
  }

  @Post(':id/draw')
  async draw(
    @Param('id') roundId: string,
  ) {
    const round = await this.roundsService.getRoundById(roundId);
    const drawnUsers = await this.roundsService.startRound(round);

    return drawnUsers;
  }
}
