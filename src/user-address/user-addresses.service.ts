import {
  ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FoodPlacesService } from '../food-places/food-places.service';
import { FoodPlace } from '../food-places/food-place.entity';

import { UserAddress } from './user-address.entity';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UserAddressesRepository } from './user-addresses.repository';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';

@Injectable()
export class UserAddressService {
  private logger = new Logger('UserAddressService', { timestamp: true });

  constructor(
    @InjectRepository(UserAddressesRepository)
    private userAddressesRepository: UserAddressesRepository,
    private foodPlacesService: FoodPlacesService,
  ) {}

  async create(createUserAddressDto: CreateUserAddressDto, userId: string) {
    const foodPlace: FoodPlace = createUserAddressDto.foodPlaceId
      ? await this.foodPlacesService.getFoodPlaceById(createUserAddressDto.foodPlaceId)
      : null;

    try {
      return await this.userAddressesRepository.createUserAddress(createUserAddressDto, userId, foodPlace);
    } catch (error) {
      this.logger.error(error);
      if (error.code === '23505') {
        throw new ConflictException(`Address already exists for user ${userId}`);
      }

      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }
  }

  find(userId: string): Promise<UserAddress> {
    return this.userAddressesRepository.findOne({ userId });
  }

  async update(userId: string, updateUserAddressDto: UpdateUserAddressDto) {
    const userAddress: UserAddress = await this.find(userId);
    const foodPlace: FoodPlace = updateUserAddressDto.foodPlaceId
      ? await this.foodPlacesService.getFoodPlaceById(updateUserAddressDto.foodPlaceId)
      : null;

    return this.userAddressesRepository.save({
      id: userAddress.id,
      userId,
      ...userAddress,
      ...updateUserAddressDto,
      foodPlace,
    });
  }

  async remove(userId: string) {
    const result = await this.userAddressesRepository.delete({ userId });

    if (result.affected === 0) {
      throw new NotFoundException(`Address for user ${userId} not found`);
    }
  }
}
