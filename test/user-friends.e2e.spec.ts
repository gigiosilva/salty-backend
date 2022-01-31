import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { RoundsRepository } from '../src/rounds/rounds.repository';
import { UserFriendsRepository } from '../src/user-friends/user-friends.repository';
import { UserFriendsModule } from '../src/user-friends/user-friends.module';

const userFriendsRepoMock = {
  delete: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
  createUserFriend: jest.fn(),
  createQueryBuilder: {
    getMany: jest.fn(),
  },
};

const roundsRepoMock = {
  delete: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
  createUserFriend: jest.fn(),
  createQueryBuilder: {
    getMany: jest.fn(),
  },
};

describe('** USER FRIENDS ROUTES **', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserFriendsModule],
    })
      .overrideProvider(UserFriendsRepository)
      .useValue(userFriendsRepoMock)
      .overrideProvider(RoundsRepository)
      .useValue(roundsRepoMock)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('GET /users/:userId/rounds/:roundId', () => {
    const expectedRound = {
      id: '515984d4-cfde-4ddb-9203-fc4355590f23',
      createdBy: '5c9f8f8f-f912-4b4e-9016-4ef9c28bec06',
      name: 'Round 1',
      startDate: '2022-01-11T00:00:00.000Z',
      endDate: '2022-01-20T00:00:00.000Z',
      comments: 'The best round ever',
      isActive: true,
      createdAt: '2022-01-11T20:02:55.208Z',
    };

    const expectedUserFriend = {
      id: '8517b65a-5e0c-4da8-bfa5-05c99a667e34',
      userId: '1341132',
      friendId: 'tesdde23',
      giftPhoto: null,
      giftDescription: null,
      giftDate: null,
      hasGift: false,
      createdAt: '2022-01-31T21:52:54.442Z',
      round: expectedRound,
    };

    it('should return an user friend', async () => {
      roundsRepoMock.findOne.mockResolvedValue(expectedRound);
      userFriendsRepoMock.findOne.mockResolvedValue(expectedUserFriend);

      return request(app.getHttpServer())
        .get('/users/1341132/rounds/515984d4-cfde-4ddb-9203-fc4355590f23')
        .expect(200)
        .expect(expectedUserFriend);
    });
  });

  describe('DELETE /users/:userId/rounds/:roundId', () => {
    it('should delete an user friend', async () => {
      roundsRepoMock.findOne.mockResolvedValue({});
      userFriendsRepoMock.delete.mockResolvedValue({
        affected: 1,
      });

      await request(app.getHttpServer())
        .delete('/users/1243/rounds/515984d4-cfde-4ddb-9203-fc4355590f23')
        .expect(200);

      expect(userFriendsRepoMock.delete).toBeCalled();
    });
  });

  describe('PUT /users/:userId/rounds/:roundId', () => {
    const expectedRound = {
      id: '515984d4-cfde-4ddb-9203-fc4355590f23',
      createdBy: '5c9f8f8f-f912-4b4e-9016-4ef9c28bec06',
      name: 'Round 1',
      startDate: '2022-01-11T00:00:00.000Z',
      endDate: '2022-01-20T00:00:00.000Z',
      comments: 'The best round ever',
      isActive: true,
      createdAt: '2022-01-11T20:02:55.208Z',
    };

    const newUserFriend = {
      id: '8517b65a-5e0c-4da8-bfa5-05c99a667e34',
      userId: '1341132',
      friendId: 'tesdde23',
      giftPhoto: null,
      giftDescription: null,
      giftDate: null,
      hasGift: false,
      createdAt: '2022-01-31T21:52:54.442Z',
      round: expectedRound,
    };

    const updatedUserFriend = {
      id: '8517b65a-5e0c-4da8-bfa5-05c99a667e34',
      userId: '1341132',
      friendId: 'tesdde23',
      giftPhoto: null,
      giftDescription: null,
      giftDate: null,
      hasGift: false,
      createdAt: '2022-01-31T21:52:54.442Z',
      round: expectedRound,
    };

    it('should update an user friend', async () => {
      roundsRepoMock.findOne.mockResolvedValue(expectedRound);
      userFriendsRepoMock.findOne.mockResolvedValue(updatedUserFriend);
      userFriendsRepoMock.save.mockResolvedValue(updatedUserFriend);

      await request(app.getHttpServer())
        .put('/users/1243/rounds/515984d4-cfde-4ddb-9203-fc4355590f23')
        .send(newUserFriend)
        .expect(200)
        .expect(updatedUserFriend);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
