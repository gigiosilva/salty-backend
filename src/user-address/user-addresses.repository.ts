import { EntityRepository, Repository } from 'typeorm';

import { FoodPlace } from '../food-places/food-place.entity';

import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UserAddress } from './user-address.entity';

@EntityRepository(UserAddress)
export class UserAddressesRepository extends Repository<UserAddress> {
  async createUserAddress(
    createUserAddressDto: CreateUserAddressDto,
    userId: string,
    foodPlace: FoodPlace,
  ): Promise<UserAddress> {
    const {
      name,
      street,
      district,
      city,
      state,
      country,
      zipCode,
      complement,
      longAddress,
      weekAvailability,
      latitude,
      longitude,
    } = createUserAddressDto;

    const userAddress = this.create({
      name,
      street,
      district,
      city,
      state,
      country,
      zipCode,
      complement,
      longAddress,
      weekAvailability,
      latitude,
      longitude,
      userId,
      foodPlace,
    });

    await this.save(userAddress);

    return userAddress;
  }
}
