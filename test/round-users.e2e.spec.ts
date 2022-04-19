import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { RoundsRepository } from '../src/rounds/rounds.repository';
import { RoundUsersRepository } from '../src/round-users/round-users.repository';
import { RoundUsersModule } from '../src/round-users/round-users.module';

import { CloudinaryService } from './../src/third-party/cloudinary.service';

const roundUsersRepoMock = {
  delete: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
  createRoundUser: jest.fn(),
  createQueryBuilder: {
    getMany: jest.fn(),
  },
};

const roundsRepoMock = {
  delete: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
  createRoundUser: jest.fn(),
  createQueryBuilder: {
    getMany: jest.fn(),
  },
};

const cloudinaryServiceMock = {
  uploadPhoto: jest.fn(),
};

describe('** ROUND USERS ROUTES **', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RoundUsersModule],
    })
      .overrideProvider(RoundUsersRepository)
      .useValue(roundUsersRepoMock)
      .overrideProvider(RoundsRepository)
      .useValue(roundsRepoMock)
      .overrideProvider(CloudinaryService)
      .useValue(cloudinaryServiceMock)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('GET /rounds/:roundId/users/:userId', () => {
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

    const expectedRoundUser = {
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

    it('should return an round user', async () => {
      roundsRepoMock.findOne.mockResolvedValue(expectedRound);
      roundUsersRepoMock.findOne.mockResolvedValue(expectedRoundUser);

      return request(app.getHttpServer())
        .get('/rounds/515984d4-cfde-4ddb-9203-fc4355590f23/users/1341132')
        .expect(200)
        .expect(expectedRoundUser);
    });
  });

  describe('DELETE /rounds/:roundId/users/:userId', () => {
    it('should delete an round user', async () => {
      roundsRepoMock.findOne.mockResolvedValue({});
      roundUsersRepoMock.delete.mockResolvedValue({
        affected: 1,
      });

      await request(app.getHttpServer())
        .delete('/rounds/515984d4-cfde-4ddb-9203-fc4355590f23/users/1243')
        .expect(200);

      expect(roundUsersRepoMock.delete).toBeCalled();
    });
  });

  describe('PUT /rounds/:roundId/users/:userId', () => {
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

    const newRoundUser = {
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

    const updatedRoundUser = {
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

    it('should update an round user', async () => {
      roundsRepoMock.findOne.mockResolvedValue(expectedRound);
      roundUsersRepoMock.findOne.mockResolvedValue(updatedRoundUser);
      roundUsersRepoMock.save.mockResolvedValue(updatedRoundUser);

      await request(app.getHttpServer())
        .put('/rounds/515984d4-cfde-4ddb-9203-fc4355590f23/users/1243')
        .send(newRoundUser)
        .expect(200)
        .expect(updatedRoundUser);
    });
  });

  describe('POST /rounds/:roundId/users/:userId/photo', () => {
    const userId = '1243';
    const roundId = '515984d4-cfde-4ddb-9203-fc4355590f23';

    const foundRoundUser = {
      id: 'c1c8861a-0ca4-45a0-b3ea-46e99884a823',
      userId: '8',
      friendId: '91',
      roundId: 'a48fc0ca-b619-4870-b7c0-df238f9b7b84',
      giftPhoto: null,
      giftDescription: null,
      giftDate: null,
      hasGift: false,
      createdAt: '2022-03-23T20:32:41.517Z',
      round: {
        id: 'a48fc0ca-b619-4870-b7c0-df238f9b7b84',
        createdBy: '5c9f8f8f-f912-4b4e-9016-4ef9c28bec06',
        name: 'Round 15',
        startDate: '2022-03-16T17:50:00.548Z',
        endDate: '2022-03-16T17:52:00.000Z',
        comments: 'The best round ever',
        isActive: false,
        createdAt: '2022-03-22T21:34:19.193Z',
      },
    };

    const uploadedPhoto = {
      giftPhoto: 'https://res.cloudinary.com/hseisycjn/image/upload/v1650395825/rounds/a48fc0ca-b619-4870-b7c0-df238f9b7b84/8.png',
    };

    const expectedResponse = {
      ...foundRoundUser,
      ...uploadedPhoto,
    };

    it('should add gift photo', async () => {
      roundUsersRepoMock.findOne.mockResolvedValue(foundRoundUser);
      roundUsersRepoMock.save.mockResolvedValue(expectedResponse);
      cloudinaryServiceMock.uploadPhoto.mockResolvedValue(uploadedPhoto);

      await request(app.getHttpServer())
        .post(`/rounds/${roundId}/users/${userId}/photo`)
        .attach('file', `${__dirname}/mock/gift-photo.png`)
        .expect(201)
        .expect(expectedResponse);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
