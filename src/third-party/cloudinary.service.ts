import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 as Cloudinary } from 'cloudinary';
import { Express } from 'express';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  async uploadPhoto(folderPath: string, file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = Cloudinary.uploader.upload_stream({
        public_id: folderPath,
        unique_filename: true,
      }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      toStream(file.buffer).pipe(upload);
    });
  }
}
