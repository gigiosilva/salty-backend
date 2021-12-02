import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Method } from 'axios';
import { map, lastValueFrom } from 'rxjs';

import { UserModel } from './user.model';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async getUser(accessToken, userId): Promise<any> {
    const options = {
      method: 'GET' as Method,
      url: `${process.env.AUTH0_AUDIENCE}users/${userId}`,
      headers: { authorization: `Bearer ${accessToken}` },
    };

    const user = await this.httpService.request<UserModel[]>(options).pipe(
      map(response => response.data),
    );

    return user;
  }

  async updateUser(accessToken, userId, responseBody: UpdateUserDto): Promise<any> {
    const options = {
      method: 'PATCH' as Method,
      url: `${process.env.AUTH0_AUDIENCE}users/${userId}`,
      headers: { authorization: `Bearer ${accessToken}` },
      data: {
        user_metadata: responseBody.metadata,
      },
    };

    const user = await this.httpService.request<UserModel[]>(options).pipe(
      map(response => response.data),
    );

    return user;
  }
}
