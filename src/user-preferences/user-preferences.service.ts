import {
  ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserPreference } from './user-preference.entity';
import { CreateUserPreferenceDto } from './dto/create-user-preference.dto';
import { UpdateUserPreferenceDto } from './dto/update-user-preference.dto';
import { UserPreferencesRepository } from './user-preferences.repository';

@Injectable()
export class UserPreferencesService {
  private logger = new Logger('UserPreferencesService', { timestamp: true });

  constructor(
    @InjectRepository(UserPreferencesRepository)
    private userPreferencesRepository: UserPreferencesRepository,
  ) {}

  async create(createUserPreferenceDto: CreateUserPreferenceDto, userId: string) {
    try {
      return await this.userPreferencesRepository.createUserPreference(createUserPreferenceDto, userId);
    } catch (error) {
      this.logger.error(error);
      if (error.code === '23505') {
        throw new ConflictException(`Preferences already exists for user ${userId}`);
      }

      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }
  }

  find(userId: string) {
    return this.userPreferencesRepository.findOne({ userId });
  }

  async update(userId: string, updateUserPreferenceDto: UpdateUserPreferenceDto) {
    const userPreference: UserPreference = await this.find(userId);

    return this.userPreferencesRepository.save({
      id: userPreference.id,
      userId,
      ...userPreference,
      ...updateUserPreferenceDto,
    });
  }

  async remove(userId: string) {
    const result = await this.userPreferencesRepository.delete({ userId });

    if (result.affected === 0) {
      throw new NotFoundException(`Preference for user ${userId} not found`);
    }
  }
}
