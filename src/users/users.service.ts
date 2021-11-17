import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Method } from 'axios';
import { map, lastValueFrom } from 'rxjs';

import { GetUsersDto } from './dto/get-users-dto';

@Injectable()
export class UsersService {
  constructor(private httpService: HttpService) {}

  async getUsers(accessToken): Promise<any> {
    const options = {
      method: 'GET' as Method,
      url: `${process.env.AUTH0_AUDIENCE}users`,
      headers: { authorization: `Bearer ${accessToken}` },
    };

    const response = await lastValueFrom(this.httpService.request<GetUsersDto[]>(options).pipe(
      map(({ data }) => data.map(item => ({
        IdUser: item.user_id,
        Name: item.name,
        NickName: item.nickname,
        Email: item.email,
        Picture: item.picture,
        CreatedAt: item.created_at,
        LastLogin: item.last_login,
      }))),
    ));

    return response;
  }
}
