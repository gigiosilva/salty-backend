import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { FoodPlacesModule } from '../src/food-places/food-places.module';
import { FoodPlacesRepository } from '../src/food-places/food-places.repository';

const foodPlacesRepoMock = {
  getFoodPlaces: jest.fn(),
  delete: jest.fn(),
  findOne: jest.fn(),
  createFoodPlace: jest.fn(),
  createQueryBuilder: {
    getMany: jest.fn(),
  },
};

describe('** FOOD PLACES ROUTES **', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FoodPlacesModule],
    })
      .overrideProvider(FoodPlacesRepository)
      .useValue(foodPlacesRepoMock)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('GET /food-places', () => {
    const expectedFoodPlaces = [
      {
        name: 'Pedidos Ya',
        website: 'https://www.pedidosya.com/',
      },
      {
        name: 'Pedidos Ya1',
        website: 'https://www.pedidosya2.com/',
      },
    ];

    it('should return all food places', async () => {
      foodPlacesRepoMock.getFoodPlaces.mockResolvedValue(expectedFoodPlaces);

      return request(app.getHttpServer())
        .get('/food-places')
        .expect(200)
        .expect(expectedFoodPlaces);
    });
  });

  describe('GET /food-places/:id', () => {
    const expectedFoodPlace = {
      id: '18b35315-4995-4fe6-885b-f69995ce741f',
      name: 'Pedidos Ya',
      website: 'https://www.pedidosya.com/',
    };

    it('should return one specific food place', async () => {
      foodPlacesRepoMock.findOne.mockResolvedValue(expectedFoodPlace);

      return request(app.getHttpServer())
        .get('/food-places/18b35315-4995-4fe6-885b-f69995ce741f')
        .expect(200)
        .expect(expectedFoodPlace);
    });

    it('should not find a food place', async () => {
      foodPlacesRepoMock.findOne.mockResolvedValue(null);

      return request(app.getHttpServer())
        .get('/food-places/123123')
        .expect(404);
    });
  });

  describe('DELETE /food-places/:id', () => {
    it('should delete a food place', async () => {
      foodPlacesRepoMock.delete.mockResolvedValue({
        affected: 1,
      });

      await request(app.getHttpServer())
        .delete('/food-places/18b35315-4995-4fe6-885b-f69995ce741f')
        .expect(200);

      expect(foodPlacesRepoMock.delete).toBeCalled();
    });
  });

  describe('POST /food-places', () => {
    const newFoodPlace = {
      name: 'Pedidos Ya',
      website: 'https://www.pedidosya.com/',
    };

    const createdFoodPlace = {
      id: '18b35315-4995-4fe6-885b-f69995ce741f',
      name: 'Pedidos Ya',
      website: 'https://www.pedidosya.com/',
    };

    it('should create a food place', async () => {
      foodPlacesRepoMock.createFoodPlace.mockResolvedValue(createdFoodPlace);

      await request(app.getHttpServer())
        .post('/food-places')
        .send(newFoodPlace)
        .expect(201)
        .expect(createdFoodPlace);

      expect(foodPlacesRepoMock.createFoodPlace).toBeCalled();
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
