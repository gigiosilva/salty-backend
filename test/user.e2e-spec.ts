import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthGuard } from '@nestjs/passport';

import { UsersModule } from '../src/users/users.module';
import { AuthzModule } from '../src/authz/authz.module';
import { AuthzService } from '../src/authz/authz.service';
import { UsersService } from '../src/users/users.service';

const usersServiceMock = {
  getUsers: jest.fn(),
};

const authzServiceMock = {
  getAccess: jest.fn(),
};

describe('** USER ROUTES **', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const mockAuthGuard = { canActivate: jest.fn(() => true) };
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, AuthzModule],
    })
      .overrideProvider(UsersService)
      .useValue(usersServiceMock)
      .overrideGuard(AuthGuard('jwt'))
      .useValue(mockAuthGuard)
      .overrideProvider(AuthzService)
      .useValue(authzServiceMock)
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

  afterAll(async () => {
    await app.close();
  });
});
