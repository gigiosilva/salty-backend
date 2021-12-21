import { EntityRepository, Repository } from 'typeorm';

import { CreateUserPreferenceDto } from './dto/create-user-preference.dto';
import { UserPreference } from './user-preference.entity';

@EntityRepository(UserPreference)
export class UserPreferencesRepository extends Repository<UserPreference> {
  async createUserPreference(
    createUserPreferenceDto: CreateUserPreferenceDto,
    userId: string,
  ): Promise<UserPreference> {
    const {
      preferences,
      comments,
      isDelivery,
    } = createUserPreferenceDto;

    const userPreference = this.create({
      userId,
      preferences,
      comments,
      isDelivery,
    });

    await this.save(userPreference);

    return userPreference;
  }
}
