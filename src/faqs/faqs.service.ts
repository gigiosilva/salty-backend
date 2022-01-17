import {
  Injectable, InternalServerErrorException, Logger, NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { Faq } from './faq.entity';
import { FaqsRepository } from './faqs.repository';

@Injectable()
export class FaqsService {
  private logger = new Logger('FaqsService', { timestamp: true });

  constructor(
    @InjectRepository(FaqsRepository)
    private faqsRepository: FaqsRepository,
  ) {}

  async create(createFaqDto: CreateFaqDto) {
    try {
      return await this.faqsRepository.createFaq(createFaqDto);
    } catch (error) {
      this.logger.error(error);
      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    const faqs = await this.faqsRepository.find();

    return faqs;
  }

  async findOne(id: string) {
    const faq = await this.faqsRepository.findOne(id);
    if (!faq) throw new NotFoundException(`FAQ with ID ${id} not found`);

    return faq;
  }

  async update(id: string, updateFaqDto: UpdateFaqDto) {
    const faq: Faq = await this.findOne(id);

    return this.faqsRepository.save({
      id: faq.id,
      ...faq,
      ...updateFaqDto,
    });
  }

  async remove(id: string) {
    try {
      const result = await this.faqsRepository.delete({ id });

      if (result.affected === 0) {
        throw new NotFoundException(`FAQ with ID ${id} not found`);
      }
    } catch (error) {
      this.logger.error(error);
      this.logger.error(error.stack);

      throw new InternalServerErrorException(error.message);
    }
  }
}
