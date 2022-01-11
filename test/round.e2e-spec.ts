import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { RoundsModule } from '../src/rounds/rounds.module';
import { RoundsRepository } from '../src/rounds/rounds.repository';

const roundsRepoMock = {
  getRounds: jest.fn(),
  delete: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  createRound: jest.fn(),
  createQueryBuilder: {
    getMany: jest.fn(),
  },
};

describe('** ROUNDS ROUTES **', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RoundsModule],
    })
      .overrideProvider(RoundsRepository)
      .useValue(roundsRepoMock)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('GET /rounds', () => {
    const expectedRounds = [
      {
        id: '515984d4-cfde-4ddb-9203-fc4355590f23',
        createdBy: '5c9f8f8f-f912-4b4e-9016-4ef9c28bec06',
        name: 'Round 1',
        startDate: '2022-01-11T00:00:00.000Z',
        endDate: '2022-01-20T00:00:00.000Z',
        comments: 'The best round ever',
        isActive: true,
        createdAt: '2022-01-11T20:02:55.208Z',
      },
      {
        id: '207af9dc-8a52-4ef9-a6b3-815815591fa9',
        createdBy: '5c9f8f8f-f912-4b4e-9016-4ef9c28bec06',
        name: 'Round 2',
        startDate: '2022-01-11T00:00:00.000Z',
        endDate: '2022-01-20T00:00:00.000Z',
        comments: 'The best round ever',
        isActive: true,
        createdAt: '2022-01-11T20:02:58.690Z',
      },
      {
        id: 'ed6442f5-339a-4a02-b8a7-268396e3105a',
        createdBy: '5c9f8f8f-f912-4b4e-9016-4ef9c28bec06',
        name: 'Round 3',
        startDate: '2022-01-11T00:00:00.000Z',
        endDate: '2022-01-20T00:00:00.000Z',
        comments: 'The best round ever',
        isActive: true,
        createdAt: '2022-01-11T20:02:54.087Z',
      },
    ];

    it('should return all rounds', async () => {
      roundsRepoMock.find.mockResolvedValue(expectedRounds);

      return request(app.getHttpServer())
        .get('/rounds')
        .expect(200)
        .expect(expectedRounds);
    });
  });

  describe('GET /rounds/:id', () => {
    const expectedRound = {
      id: 'ed6442f5-339a-4a02-b8a7-268396e3105a',
      createdBy: '5c9f8f8f-f912-4b4e-9016-4ef9c28bec06',
      name: 'Round 3',
      startDate: '2022-01-11T00:00:00.000Z',
      endDate: '2022-01-20T00:00:00.000Z',
      comments: 'The best round ever',
      isActive: true,
      createdAt: '2022-01-11T20:02:54.087Z',
    };

    it('should return one specific round', async () => {
      roundsRepoMock.findOne.mockResolvedValue(expectedRound);

      return request(app.getHttpServer())
        .get('/rounds/ed6442f5-339a-4a02-b8a7-268396e3105a')
        .expect(200)
        .expect(expectedRound);
    });

    it('should not find a round', async () => {
      roundsRepoMock.findOne.mockResolvedValue(null);

      return request(app.getHttpServer())
        .get('/rounds/123123')
        .expect(404);
    });
  });

  describe('DELETE /rounds/:id', () => {
    it('should delete a round', async () => {
      roundsRepoMock.delete.mockResolvedValue({
        affected: 1,
      });

      await request(app.getHttpServer())
        .delete('/rounds/18b35315-4995-4fe6-885b-f69995ce741f')
        .expect(200);

      expect(roundsRepoMock.delete).toBeCalled();
    });
  });

  describe('POST /rounds', () => {
    const newRound = {
      createdBy: '5c9f8f8f-f912-4b4e-9016-4ef9c28bec06',
      name: 'Round 3',
      startDate: '2022-01-11T00:00:00.000Z',
      endDate: '2022-01-20T00:00:00.000Z',
      comments: 'The best round ever',
      isActive: true,
    };

    const createdRound = {
      id: 'ed6442f5-339a-4a02-b8a7-268396e3105a',
      createdBy: '5c9f8f8f-f912-4b4e-9016-4ef9c28bec06',
      name: 'Round 3',
      startDate: '2022-01-11T00:00:00.000Z',
      endDate: '2022-01-20T00:00:00.000Z',
      comments: 'The best round ever',
      isActive: true,
      createdAt: '2022-01-11T20:02:54.087Z',
    };

    it('should create a round', async () => {
      roundsRepoMock.createRound.mockResolvedValue(createdRound);

      await request(app.getHttpServer())
        .post('/rounds')
        .send(newRound)
        .expect(201)
        .expect(createdRound);

      expect(roundsRepoMock.createRound).toBeCalled();
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
