import { EntityRepository, Repository } from 'typeorm';

import { CreateRoundUserDto } from './dto/create-round-user.dto';
import { RoundUser } from './round-user.entity';

@EntityRepository(RoundUser)
export class RoundUsersRepository extends Repository<RoundUser> {
  async createRoundUser(userId: string, roundId: string, createRoundUserDto: CreateRoundUserDto): Promise<RoundUser> {
    const {
      friendId, giftPhoto, giftDescription, giftDate, hasGift,
    } = createRoundUserDto;

    const roundUser = this.create({
      userId,
      roundId,
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
