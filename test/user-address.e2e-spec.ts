import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { FoodPlacesRepository } from '../src/food-places/food-places.repository';
import { UserAddressModule } from '../src/user-address/user-addresses.module';
import { UserAddressesRepository } from '../src/user-address/user-addresses.repository';

const userAddressesRepoMock = {
  delete: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
  createUserAddress: jest.fn(),
  createQueryBuilder: {
    getMany: jest.fn(),
  },
};

const foodPlacesRepoMock = {
  getFoodPlaces: jest.fn(),
  delete: jest.fn(),
  findOne: jest.fn(),
  createFoodPlace: jest.fn(),
  createQueryBuilder: {
    getMany: jest.fn(),
  },
};

describe('** USER ADDRESS ROUTES **', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserAddressModule],
    })
      .overrideProvider(UserAddressesRepository)
      .useValue(userAddressesRepoMock)
      .overrideProvider(FoodPlacesRepository)
      .useValue(foodPlacesRepoMock)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('GET /users/:userId/addresses', () => {
    const expectedUserAddresses = {
      name: 'Home',
      street: 'Rua emilio marelo',
      district: 'Jardim Paulista',
      city: 'São Paulo',
      state: 'SP',
      country: 'Brasil',
      zipCode: '12250-100',
      complement: 'Bloco P Apto 102',
      longAddress: 'Rua emilio marelo, 200, jardim das flores, São Paulo, SP, Brasil',
      latitude: '-23.564',
      longitude: '-46.664',
      foodPlaceId: '24688f71-6267-4bc7-8d1d-1dae04a4e296',
      weekAvailability: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
    };

    it('should return an user address', async () => {
      userAddressesRepoMock.findOne.mockResolvedValue(expectedUserAddresses);

      return request(app.getHttpServer())
        .get('/users/123/addresses')
        .expect(200)
        .expect(expectedUserAddresses);
    });
  });

  describe('DELETE /users/:userId/addresses', () => {
    it('should delete an user address', async () => {
      userAddressesRepoMock.delete.mockResolvedValue({
        affected: 1,
      });

      await request(app.getHttpServer())
        .delete('/users/1243/addresses')
        .expect(200);

      expect(userAddressesRepoMock.delete).toBeCalled();
    });
  });

  describe('POST /users/:userId/addresses', () => {
    const newUserAddress = {
      name: 'Home',
      street: 'Rua emilio marelo',
      district: 'Jardim Paulista',
      city: 'São Paulo',
      state: 'SP',
      country: 'Brasil',
      zipCode: '12250-100',
      complement: 'Bloco P Apto 102',
      longAddress: 'Rua emilio marelo, 200, jardim das flores, São Paulo, SP, Brasil',
      latitude: '-23.564',
      longitude: '-46.664',
      weekAvailability: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
    };

    const createdUserAddress = {
      id: '18b35315-4995-4fe6-885b-f69995ce741f',
      name: 'Home',
      street: 'Rua emilio marelo',
      district: 'Jardim Paulista',
      city: 'São Paulo',
      state: 'SP',
      country: 'Brasil',
      zipCode: '12250-100',
      complement: 'Bloco P Apto 102',
      longAddress: 'Rua emilio marelo, 200, jardim das flores, São Paulo, SP, Brasil',
      latitude: '-23.564',
      longitude: '-46.664',
      weekAvailability: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
    };

    it('should create an user address', async () => {
      userAddressesRepoMock.createUserAddress.mockResolvedValue(createdUserAddress);

      await request(app.getHttpServer())
        .post('/users/123/addresses')
        .send(newUserAddress)
        .expect(201)
        .expect(createdUserAddress);

      expect(userAddressesRepoMock.createUserAddress).toBeCalled();
    });
  });

  describe('PUT /users/:userId/addresses', () => {
    const newUserAddress = {
      name: 'Home',
      street: 'Rua emilio marelo',
    };

    const updatedUserAddress = {
      id: '18b35315-4995-4fe6-885b-f69995ce741f',
      name: 'Home',
      street: 'Rua emilio marelo',
    };

    it('should update an user address', async () => {
      userAddressesRepoMock.findOne.mockResolvedValue(updatedUserAddress);
      userAddressesRepoMock.save.mockResolvedValue(updatedUserAddress);

      await request(app.getHttpServer())
        .put('/users/123/addresses')
        .send(newUserAddress)
        .expect(200)
        .expect(updatedUserAddress);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
