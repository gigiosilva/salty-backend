import {
  Injectable, InternalServerErrorException, Logger, NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateRoundDto } from './dto/create-round.dto';
import { UpdateRoundDto } from './dto/update-round.dto';
import { Round } from './round.entity';
import { RoundsRepository } from './rounds.repository';

@Injectable()
export class RoundsService {
  private logger = new Logger('RoundsService', { timestamp: true });

  constructor(
    @InjectRepository(RoundsRepository)
    private roundsRepository: RoundsRepository,
  ) {}

  async create(createRoundDto: CreateRoundDto) {
    try {
      const round = await this.roundsRepository.createRound(createRoundDto);

      return round;
    } catch (error) {
      this.logger.error(error);
      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getAllRounds() {
    const rounds = await this.roundsRepository.find();

    return rounds;
  }

  async getActiveRounds() {
    const rounds = await this.roundsRepository.find({
      where: {
        isActive: true,
      },
    });

    return rounds;
  }

  async getRoundById(id: string) {
    const round = await this.roundsRepository.findOne(id);
    if (!round) throw new NotFoundException(`Round with ID ${id} not found`);

    return round;
  }

  async updateRound(id: string, updateRoundDto: UpdateRoundDto) {
    const round: Round = await this.getRoundById(id);

    return this.roundsRepository.save({
      id: round.id,
      ...round,
      ...updateRoundDto,
    });
  }

  async remove(id: string) {
    try {
      const result = await this.roundsRepository.delete({ id });

      if (result.affected === 0) {
        throw new NotFoundException(`Round with ID ${id} not found`);
      }
    } catch (error) {
      this.logger.error(error);
      this.logger.error(error.stack);

      throw new InternalServerErrorException(error.message);
    }
  }

  async startRound(round: Round) {
    this.logger.log(`Round Started ${JSON.stringify(round)}`);
    // get round users
    // draw users
  }

  async endRound(round: Round) {
    this.logger.log(`Round finished ${JSON.stringify(round)}`);
    await this.updateRound(round.id, { isActive: false });
  }

  async deactiveOldRounds(activeRounds: Round[]) {
    for (const round of activeRounds) {
      if (round.endDate <= new Date()) this.endRound(round);
    }
  }
}
