import { EntityRepository, Repository } from 'typeorm';

import { CreateFaqDto } from './dto/create-faq.dto';
import { Faq } from './faq.entity';

@EntityRepository(Faq)
export class FaqsRepository extends Repository<Faq> {
  async createFaq(
    createFaqDto: CreateFaqDto,
  ): Promise<Faq> {
    const {
      title,
      description,
      category,
    } = createFaqDto;

    const faq = this.create({
      title,
      description,
      category,
    });

    await this.save(faq);

    return faq;
  }
}
