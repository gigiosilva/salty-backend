import { EntityRepository, Repository } from 'typeorm';

import { CreateRoundDto } from './dto/create-round.dto';
import { Round } from './round.entity';

@EntityRepository(Round)
export class RoundsRepository extends Repository<Round> {
  async createRound(createRoundDto: CreateRoundDto): Promise<Round> {
    const {
      createdBy,
      name,
      startDate,
      endDate,
      comments,
      isActive,
    } = createRoundDto;

    const round = this.create({
      createdBy,
      name,
      startDate,
      endDate,
      comments,
      isActive,
    });

    await this.save(round);

    return round;
  }
}
