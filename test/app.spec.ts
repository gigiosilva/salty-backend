import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { FoodPlacesService } from '../src/food-places/food-places.service';
import { AppModule } from '../src/app.module';

import { FoodPlacesRepository } from './../src/food-places/food-places.repository';

const mockRepository = () => ({
  getRepository: jest.fn(),
  createConnection: () => jest.fn(),
  getConnection: () => jest.fn(),
  BaseEntity: class Mock {},
  ObjectType: () => jest.fn(),
  Entity: () => jest.fn(),
  InputType: () => jest.fn(),
  Index: () => jest.fn(),
  PrimaryGeneratedColumn: () => jest.fn(),
  PrimaryColumn: () => jest.fn(),
  JoinColumn: () => jest.fn(),
  Column: () => jest.fn(),
  CreateDateColumn: () => jest.fn(),
  UpdateDateColumn: () => jest.fn(),
  OneToMany: () => jest.fn(),
  ManyToOne: () => jest.fn(),
  Unique: () => jest.fn(),
  OneToOne: () => jest.fn(),
  In: () => jest.fn(),
  getFoodPlaces: jest.fn(),
});

describe('** FOOD PLACES ROUTES **', () => {
  let app: INestApplication;
  // let foodPlacesService: FoodPlacesService;
  let repository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        FoodPlacesService,
        { provide: FoodPlacesRepository, useFactory: mockRepository },
      ],
    }).compile();

    // foodPlacesService = moduleFixture.get(FoodPlacesService);
    repository = moduleFixture.get(FoodPlacesRepository);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /food-places', () => {
    it('should return all food places', () => {
      repository.getFoodPlaces.mockResolvedValue(null);

      return request(app.getHttpServer())
        .get('/food-places')
        .expect(200)
        .expect('Hello World!');
    });
  });
});
