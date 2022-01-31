import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserFriendsRepository } from './user-friends.repository';
import { RoundsService } from './../rounds/rounds.service';
import { Round } from './../rounds/round.entity';
import { UserFriend } from './user-friend.entity';
import { UpdateUserFriendDto } from './dto/update-user-friend.dto';

@Injectable()
export class UserFriendsService {
  constructor(
    @InjectRepository(UserFriendsRepository)
    private userFriendsRepository: UserFriendsRepository,
    private roundsService: RoundsService,
  ) {}

  // TODO: we need to define the business logic
  // if friends are going to be sorted individually or by batch
  async create(userId: string, roundId: string) {
    const round: Round = await this.roundsService.getRoundById(roundId);

    // Implement logic to get all available users in the round and sort

    return this.userFriendsRepository.save({ userId, friendId: 'tesdde23', round });
  }

  async findOne(userId: string, roundId: string) {
    const round: Round = await this.roundsService.getRoundById(roundId);
    if (!round) throw new NotFoundException();

    return this.userFriendsRepository.findOne({ where: { userId, round } });
  }

  async update(userId: string, roundId: string, updateUserFriendDto: UpdateUserFriendDto) {
    const userFriend: UserFriend = await this.findOne(userId, roundId);
    if (!userFriend) throw new NotFoundException();

    return this.userFriendsRepository.save({
      id: userFriend.id,
      ...userFriend,
      ...updateUserFriendDto,
    });
  }

  async remove(userId: string, roundId: string) {
    const round: Round = await this.roundsService.getRoundById(roundId);
    if (!round) throw new NotFoundException();

    const result = await this.userFriendsRepository.delete({ userId, round });

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
