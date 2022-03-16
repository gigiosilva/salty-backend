import {
  Injectable, InternalServerErrorException, Logger, NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RoundUser } from './../round-users/round-user.entity';
import { RoundUsersService } from './../round-users/round-users.service';
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
    private roundUsersService: RoundUsersService,
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
    const roundUsers = await this.roundUsersService.findAll(round.id);
    if (!roundUsers.length) return;

    const drawnUsers = this.drawRound(round, roundUsers);
    this.logger.verbose(`Drawn users ${JSON.stringify(drawnUsers.map(user => ({ userId: user.userId, friendId: user.friendId })))}`);
    // we can send email or slack message here
  }

  async endRound(round: Round) {
    await this.updateRound(round.id, { isActive: false });
  }

  async deactiveOldRounds(activeRounds: Round[]) {
    for (const round of activeRounds) {
      if (round.endDate <= new Date()) this.endRound(round);
    }
  }

  drawRound(round: Round, roundUsers: RoundUser[]) {
    this.logger.log(`Drawing round ${JSON.stringify(round)}`);

    const drawnUsers = [...roundUsers];

    roundUsers.forEach((roundUser, i) => {
      if (roundUser.friendId) return roundUser;

      const notDrawnUsers = drawnUsers.filter(
        // remove users already drawn
        user => drawnUsers.find(drawnUser => drawnUser.friendId === user.userId) === undefined
        // remove own user
        && user.userId !== roundUser.userId,
      );

      const drawIndex = Math.floor(Math.random() * notDrawnUsers.length);

      drawnUsers[i].friendId = notDrawnUsers[drawIndex]?.userId || null;
      this.roundUsersService.update(drawnUsers[i].userId, drawnUsers[i].roundId, drawnUsers[i]);
    });

    return drawnUsers;
  }
}
