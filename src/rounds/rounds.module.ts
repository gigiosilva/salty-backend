import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoundsService } from './rounds.service';
import { RoundsController } from './rounds.controller';
import { RoundsRepository } from './rounds.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoundsRepository])],
  controllers: [RoundsController],
  providers: [RoundsService],
  exports: [RoundsService],
})
export class RoundsModule {}
