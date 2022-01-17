import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FaqsService } from './faqs.service';
import { FaqsController } from './faqs.controller';
import { FaqsRepository } from './faqs.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FaqsRepository])],
  controllers: [FaqsController],
  providers: [FaqsService],
})
export class FaqsModule {}
