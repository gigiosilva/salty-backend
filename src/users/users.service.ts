import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Method } from 'axios';
import { map, lastValueFrom } from 'rxjs';

import { UserModel } from './user.model';

@Injectable()
export class UsersService {
  constructor(private httpService: HttpService) {}

  async getUsers(accessToken): Promise<any> {
    const options = {
      method: 'GET' as Method,
      url: `${process.env.AUTH0_AUDIENCE}users`,
      headers: { authorization: `Bearer ${accessToken}` },
    };

    const response = await lastValueFrom(this.httpService.request<UserModel[]>(options).pipe(
      map(({ data }) => data.map(item => new UserModel(item))),
    ));

    return response;
  }
}
