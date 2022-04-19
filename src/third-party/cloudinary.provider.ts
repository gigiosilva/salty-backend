import { Provider } from '@nestjs/common';
import { ConfigOptions, v2 } from 'cloudinary';
import * as dotenv from 'dotenv';

dotenv.config();

export default {
  provide: 'CLOUDINARY',
  useFactory: (): ConfigOptions => v2.config(process.env.CLOUDINARY_URL),
} as Provider;
