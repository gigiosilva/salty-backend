import { EntityRepository, Repository } from 'typeorm';

import { UserFriend } from './user-friend.entity';

@EntityRepository(UserFriend)
export class UserFriendsRepository extends Repository<UserFriend> {}
