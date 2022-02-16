import { EntityRepository, Repository } from 'typeorm';

import { Round } from '../rounds/round.entity';

import { CreateRoundUserDto } from './dto/create-round-user.dto';
import { RoundUser } from './round-user.entity';

@EntityRepository(RoundUser)
export class RoundUsersRepository extends Repository<RoundUser> {
  async createRoundUser(userId: string, round: Round, createRoundUserDto: CreateRoundUserDto): Promise<RoundUser> {
    const {
      friendId, giftPhoto, giftDescription, giftDate, hasGift,
    } = createRoundUserDto;

    const roundUser = this.create({
      userId,
      round,
      friendId,
      giftPhoto,
      giftDescription,
      giftDate,
      hasGift,
    });

    await this.save(roundUser);

    return roundUser;
  }
}
