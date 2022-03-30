import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthGuard } from '@nestjs/passport';

import { UsersModule } from '../src/users/users.module';
import { AuthzModule } from '../src/authz/authz.module';
import { UserPreferencesModule } from '../src/user-preferences/user-preferences.module';
import { UserAddressModule } from '../src/user-address/user-addresses.module';
import { AuthzService } from '../src/authz/authz.service';
import { UsersService } from '../src/users/users.service';
import { UserPreferencesRepository } from '../src/user-preferences/user-preferences.repository';
import { UserAddressesRepository } from '../src/user-address/user-addresses.repository';
import { FoodPlacesRepository } from '../src/food-places/food-places.repository';

const usersServiceMock = {
  getUsers: jest.fn(),
  getUser: jest.fn(),
  updateUser: jest.fn(),
};

const authzServiceMock = {
  getAccess: jest.fn(),
};

const userPreferencesRepositoryMock = {
  find: jest.fn(),
  findOne: jest.fn(),
};

const userAddressRepositoryMock = {
  find: jest.fn(),
  findOne: jest.fn(),
};

const foodPlacesRepositoryMock = {
  getFoodPlaces: jest.fn(),
};

describe('** USER ROUTES **', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const mockAuthGuard = { canActivate: jest.fn(() => true) };
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, AuthzModule, UserPreferencesModule, UserAddressModule],
    })
      .overrideProvider(UsersService)
      .useValue(usersServiceMock)
      .overrideGuard(AuthGuard('jwt'))
      .useValue(mockAuthGuard)
      .overrideProvider(AuthzService)
      .useValue(authzServiceMock)
      .overrideProvider(UserPreferencesRepository)
      .useValue(userPreferencesRepositoryMock)
      .overrideProvider(UserAddressesRepository)
      .useValue(userAddressRepositoryMock)
      .overrideProvider(FoodPlacesRepository)
      .useValue(foodPlacesRepositoryMock)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('GET /users', () => {
    const expectedUsers = [
      {
        IdUser: 'mock_id',
        Name: 'name_mock',
        NickName: 'nickname',
        Email: 'email@mock.com',
        Picture: 'picture_mock',
        CreatedAt: 'create_at_mock',
        LastLogin: 'last_login_mock',
      },
      {
        IdUser: 'mock_id1',
        Name: 'name_mock1',
        NickName: 'nickname1',
        Email: 'email@mock1.com',
        Picture: 'picture_mock1',
        CreatedAt: 'create_at_mock1',
        LastLogin: 'last_login_mock1',
      },
    ];

    it('should return all users', async () => {
      authzServiceMock.getAccess.mockResolvedValue({ access_token: 'mock' });
      usersServiceMock.getUsers.mockResolvedValue(expectedUsers);

      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect(expectedUsers);
    });
  });

  describe('GET /users/:id', () => {
    const expectedUser = {
      IdUser: 'mock_id',
      Name: 'name_mock',
      NickName: 'nickname',
      Email: 'email@mock.com',
      Picture: 'picture_mock',
      CreatedAt: 'create_at_mock',
      LastLogin: 'last_login_mock',
    };

    it('should return user', async () => {
      authzServiceMock.getAccess.mockResolvedValue({ access_token: 'mock' });
      usersServiceMock.getUser.mockResolvedValue(expectedUser);

      return request(app.getHttpServer())
        .get('/users/id')
        .expect(200)
        .expect(expectedUser);
    });
  });

  describe('PUT /users/:id', () => {
    const expectedUser = {
      IdUser: 'mock_id',
      Name: 'name_mock',
      NickName: 'nickname',
      Email: 'email@mock.com',
      Picture: 'picture_mock',
      CreatedAt: 'create_at_mock',
      LastLogin: 'last_login_mock',
    };

    it('should update user', async () => {
      authzServiceMock.getAccess.mockResolvedValue({ access_token: 'mock' });
      usersServiceMock.updateUser.mockResolvedValue(expectedUser);

      return request(app.getHttpServer())
        .put('/users/id')
        .expect(200)
        .expect(expectedUser);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
