import {
  ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RoundsService } from '../rounds/rounds.service';
import { Round } from '../rounds/round.entity';

import { CreateRoundUserDto } from './dto/create-round-user.dto';
import { RoundUsersRepository } from './round-users.repository';
import { RoundUser } from './round-user.entity';
import { UpdateRoundUserDto } from './dto/update-round-user.dto';

@Injectable()
export class RoundUsersService {
  private logger = new Logger('RoundUsersService', { timestamp: true });

  constructor(
    @InjectRepository(RoundUsersRepository)
    private roundUsersRepository: RoundUsersRepository,
    private roundsService: RoundsService,
  ) {}

  async create(userId: string, roundId: string, createRoundUserDto: CreateRoundUserDto) {
    try {
      const round: Round = await this.roundsService.getRoundById(roundId);

      return await this.roundUsersRepository.createRoundUser(userId, round, createRoundUserDto);
    } catch (error) {
      this.logger.error(error);
      if (error.code === '23505') { throw new ConflictException('RoundUser already exists'); }

      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }
  }

  async findOne(userId: string, roundId: string) {
    const round: Round = await this.roundsService.getRoundById(roundId);
    if (!round) throw new NotFoundException();

    return this.roundUsersRepository.findOne({ where: { userId, round } });
  }

  async findAll(roundId: string) {
    const round: Round = await this.roundsService.getRoundById(roundId);

    return this.roundUsersRepository.find({ round });
  }

  async update(userId: string, roundId: string, updateRoundUserDto: UpdateRoundUserDto) {
    const roundUser: RoundUser = await this.findOne(userId, roundId);
    if (!roundUser) throw new NotFoundException();

    return this.roundUsersRepository.save({
      id: roundUser.id,
      ...roundUser,
      ...updateRoundUserDto,
    });
  }

  async remove(userId: string, roundId: string) {
    const round: Round = await this.roundsService.getRoundById(roundId);
    if (!round) throw new NotFoundException();

    const result = await this.roundUsersRepository.delete({ userId, round });

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
