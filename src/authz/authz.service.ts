import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Method } from 'axios';
import { map, lastValueFrom } from 'rxjs';

import { GetAccessDto } from './dto/get-access-dto';

@Injectable()
export class AuthzService {
  constructor(private httpService: HttpService) {}

  async getAccess(): Promise<GetAccessDto> {
    const options = {
      method: 'POST' as Method,
      url: `${process.env.AUTH0_ISSUER_URL}oauth/token`,
      headers: { 'content-type': 'application/json' },
      data: {
        grant_type: 'client_credentials',
        client_id: process.env.AUTH0_M2M_CLIENT_ID,
        client_secret: process.env.AUTH0_M2M_CLIENT_SECRET,
        audience: process.env.AUTH0_AUDIENCE,
      },
    };

    const data: GetAccessDto = await lastValueFrom(this.httpService.request(options).pipe(
      map(response => response.data),
    ));

    return data;
  }
}
