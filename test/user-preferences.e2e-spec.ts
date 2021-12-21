import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { UserPreferencesModule } from '../src/user-preferences/user-preferences.module';
import { UserPreferencesRepository } from '../src/user-preferences/user-preferences.repository';

const userPreferencesRepoMock = {
  delete: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
  createUserPreference: jest.fn(),
  createQueryBuilder: {
    getMany: jest.fn(),
  },
};

describe('** USER PREFERENCES ROUTES **', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserPreferencesModule],
    })
      .overrideProvider(UserPreferencesRepository)
      .useValue(userPreferencesRepoMock)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('GET /users/:userId/preferences', () => {
    const expectedUserPreferences = {
      preferences: ['gluten free', 'vegan'],
      comments: 'Ese es mi comentario',
      isDelivery: 'true',
    };

    it('should return an user preference', async () => {
      userPreferencesRepoMock.findOne.mockResolvedValue(expectedUserPreferences);

      return request(app.getHttpServer())
        .get('/users/123/preferences')
        .expect(200)
        .expect(expectedUserPreferences);
    });
  });

  describe('DELETE /users/:userId/preferences', () => {
    it('should delete an user preference', async () => {
      userPreferencesRepoMock.delete.mockResolvedValue({
        affected: 1,
      });

      await request(app.getHttpServer())
        .delete('/users/1243/preferences')
        .expect(200);

      expect(userPreferencesRepoMock.delete).toBeCalled();
    });
  });

  describe('POST /users/:userId/preferences', () => {
    const newUserPreference = {
      preferences: ['gluten free', 'vegan'],
      comments: 'Ese es mi comentario',
      isDelivery: 'true',
    };

    const createdUserPreference = {
      id: '18b35315-4995-4fe6-885b-f69995ce741f',
      preferences: ['gluten free', 'vegan'],
      comments: 'Ese es mi comentario',
      isDelivery: 'true',
    };

    it('should create an user preference', async () => {
      userPreferencesRepoMock.createUserPreference.mockResolvedValue(createdUserPreference);

      await request(app.getHttpServer())
        .post('/users/123/preferences')
        .send(newUserPreference)
        .expect(201)
        .expect(createdUserPreference);

      expect(userPreferencesRepoMock.createUserPreference).toBeCalled();
    });
  });

  describe('PUT /users/:userId/preferences', () => {
    const newUserPreference = {
      preferences: ['gluten free', 'vegan'],
      comments: 'Ese es mi comentario',
      isDelivery: 'true',
    };

    const updatedUserPreference = {
      id: '18b35315-4995-4fe6-885b-f69995ce741f',
      preferences: ['gluten free', 'vegan'],
      comments: 'Ese es mi comentario',
      isDelivery: 'true',
    };

    it('should update an user preference', async () => {
      userPreferencesRepoMock.findOne.mockResolvedValue(updatedUserPreference);
      userPreferencesRepoMock.save.mockResolvedValue(updatedUserPreference);

      await request(app.getHttpServer())
        .put('/users/123/preferences')
        .send(newUserPreference)
        .expect(200)
        .expect(updatedUserPreference);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
