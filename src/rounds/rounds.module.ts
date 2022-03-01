import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoundsService } from './rounds.service';
import { RoundsController } from './rounds.controller';
import { RoundsRepository } from './rounds.repository';
import { RoundSchedulerService } from './round-scheduler.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoundsRepository]),
  ],
  controllers: [RoundsController],
  providers: [RoundSchedulerService, RoundsService],
})
export class RoundsModule {}
