import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { FaqsModule } from '../src/faqs/faqs.module';
import { FaqsRepository } from '../src/faqs/faqs.repository';

const faqsRepoMock = {
  delete: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
  createFaq: jest.fn(),
  createQueryBuilder: {
    getMany: jest.fn(),
  },
};

describe('** FAQS ROUTES **', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FaqsModule],
    })
      .overrideProvider(FaqsRepository)
      .useValue(faqsRepoMock)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('GET /faqs', () => {
    const expectedFaqs = [
      {
        title: 'How to choose friend?',
        description: 'You can choose by choosing',
        category: 'Friends',
      },
      {
        title: 'How to choose friend 2?',
        description: 'You can choose by choosing 2',
        category: 'Friends',
      },
    ];

    it('should return all faqs', async () => {
      faqsRepoMock.find.mockResolvedValue(expectedFaqs);

      return request(app.getHttpServer())
        .get('/faqs')
        .expect(200)
        .expect(expectedFaqs);
    });
  });

  describe('GET /faqs/:id', () => {
    const expectedFaq = {
      id: '18b35315-4995-4fe6-885b-f69995ce741f',
      title: 'How to choose friend 2?',
      description: 'You can choose by choosing 2',
      category: 'Friends',
    };

    it('should return one specific faq', async () => {
      faqsRepoMock.findOne.mockResolvedValue(expectedFaq);

      return request(app.getHttpServer())
        .get('/faqs/18b35315-4995-4fe6-885b-f69995ce741f')
        .expect(200)
        .expect(expectedFaq);
    });

    it('should not find a faq', async () => {
      faqsRepoMock.findOne.mockResolvedValue(null);

      return request(app.getHttpServer())
        .get('/faqs/123123')
        .expect(404);
    });
  });

  describe('DELETE /faqs/:id', () => {
    it('should delete a faq', async () => {
      faqsRepoMock.delete.mockResolvedValue({
        affected: 1,
      });

      await request(app.getHttpServer())
        .delete('/faqs/18b35315-4995-4fe6-885b-f69995ce741f')
        .expect(200);

      expect(faqsRepoMock.delete).toBeCalled();
    });
  });

  describe('POST /faqs', () => {
    const newFaq = {
      title: 'How to choose friend 2?',
      description: 'You can choose by choosing 2',
      category: 'Friends',
    };

    const createdFaq = {
      id: '18b35315-4995-4fe6-885b-f69995ce741f',
      title: 'How to choose friend 2?',
      description: 'You can choose by choosing 2',
      category: 'Friends',
    };

    it('should create a faq', async () => {
      faqsRepoMock.createFaq.mockResolvedValue(createdFaq);

      await request(app.getHttpServer())
        .post('/faqs')
        .send(newFaq)
        .expect(201)
        .expect(createdFaq);

      expect(faqsRepoMock.createFaq).toBeCalled();
    });
  });

  describe('PUT /faqs/:id', () => {
    const newFaq = {
      title: 'How to choose friend 2?',
      description: 'You can choose by choosing 2',
      category: 'Friends',
    };

    const updatedFaq = {
      id: '18b35315-4995-4fe6-885b-f69995ce741f',
      description: 'You can choose by choosing 3',
      category: 'Friends',
    };

    it('should update a faq', async () => {
      faqsRepoMock.findOne.mockResolvedValue(updatedFaq);
      faqsRepoMock.save.mockResolvedValue(updatedFaq);

      await request(app.getHttpServer())
        .put('/faqs/18b35315-4995-4fe6-885b-f69995ce741f')
        .send(newFaq)
        .expect(200)
        .expect(updatedFaq);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
