import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ScheduleModule } from '@nestjs/schedule';

import { RoundsModule } from '../src/rounds/rounds.module';
import { RoundsRepository } from '../src/rounds/rounds.repository';

import { RoundSchedulerService } from './../src/rounds/round-scheduler.service';
import { RoundUsersRepository } from './../src/round-users/round-users.repository';

const roundsRepoMock = {
  getRounds: jest.fn(),
  delete: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn(),
  createRound: jest.fn(),
  createQueryBuilder: {
    getMany: jest.fn(),
  },
};

const roundUsersRepoMock = {
  getRounds: jest.fn(),
  delete: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn(),
  createRound: jest.fn(),
  save: jest.fn(),
  createQueryBuilder: {
    getMany: jest.fn(),
  },
};

const roundSchedulerServiceMock = {
  cancelScheduledRound: jest.fn(),
  initRoundSchedules: jest.fn(),
  scheduleRound: jest.fn(),
};

describe('** ROUNDS ROUTES **', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RoundsModule, ScheduleModule.forRoot()],
    })
      .overrideProvider(RoundsRepository)
      .useValue(roundsRepoMock)
      .overrideProvider(RoundUsersRepository)
      .useValue(roundUsersRepoMock)
      .overrideProvider(RoundSchedulerService)
      .useValue(roundSchedulerServiceMock)
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

  describe('POST /rounds/:id/draw', () => {
    const roundId = '5c9f8f8f-f912-4b4e-9016-4ef9c28bec06';

    const roundUsers = [
      {
        id: '8fe4560c-c766-46a3-836f-e9663ce59e04',
        userId: '6',
        friendId: '9321',
        roundId: 'a48fc0ca-b619-4870-b7c0-df238f9b7b84',
      },
      {
        id: 'ed6442f5-339a-4a02-b8a7-268396e3105a',
        userId: '7',
        friendId: '9321',
        roundId: 'a48fc0ca-b619-4870-b7c0-df238f9b7b84',
      },
      {
        id: '5c9f8f8f-f912-4b4e-9016-4ef9c28bec06',
        userId: '8',
        friendId: '9321',
        roundId: 'a48fc0ca-b619-4870-b7c0-df238f9b7b84',
      },
    ];

    const roundUser = {
      id: '5c9f8f8f-f912-4b4e-9016-4ef9c28bec06',
      userId: '8',
      friendId: '9321',
      roundId: 'a48fc0ca-b619-4870-b7c0-df238f9b7b84',
    };

    const round = {
      id: 'a48fc0ca-b619-4870-b7c0-df238f9b7b84',
      createdBy: '5c9f8f8f-f912-4b4e-9016-4ef9c28bec06',
      name: 'Round 3',
      startDate: '2022-01-11T00:00:00.000Z',
      endDate: '2022-01-20T00:00:00.000Z',
      comments: 'The best round ever',
      isActive: true,
      createdAt: '2022-01-11T20:02:54.087Z',
    };

    it('should draw a round', async () => {
      roundUsersRepoMock.find.mockResolvedValue(roundUsers);
      roundUsersRepoMock.findOne.mockResolvedValue(roundUser);
      roundsRepoMock.findOne.mockResolvedValue(round);

      await request(app.getHttpServer())
        .post(`/rounds/${roundId}/draw`)
        .send()
        .expect(201)
        .expect(drawnUsers => {
          return JSON.parse(drawnUsers.text).find(user => user.friendId === null) === undefined;
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
