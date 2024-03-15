import { Injectable } from '@nestjs/common';
import {
  StorageDomain,
  StorageRepository,
} from '../../../domain/storage.domain';
import * as admin from 'firebase-admin';

@Injectable()
export class RepositoryService implements StorageRepository {
  storage: admin.storage.Storage;
  constructor() {
    this.storage = admin.storage();
  }

  //how to upload a file to firebase storage
  async uploadFile(
    files: Express.Multer.File[],
    storage: StorageDomain,
  ): Promise<string[]> {
    //how to upload a file to firebase storage
    const bucket = this.storage.bucket('gs://imago-core-offical.appspot.com');
    const publicUrls: string[] = [];

    await Promise.all(
      files.map(async (file) => {
        const fileName = `images/${storage.fileName}/${file.originalname}`;
        console.log(fileName);
        const fileUpload = bucket.file(fileName);

        const blobStream = fileUpload.createWriteStream({
          metadata: {
            contentType: file.mimetype,
          },
        });

        await new Promise((resolve, reject) => {
          blobStream.on('error', async (error) => {
            reject(error);
          });

          blobStream.on('finish', async () => {
            const [imageUrl] = await fileUpload.getSignedUrl({
              action: 'read',
              expires: '01-01-2500',
            });
            publicUrls.push(imageUrl);
            resolve(imageUrl);
          });
          blobStream.end(file.buffer);
        });
      }),
    );
    return publicUrls;
  }
  //delete folder from firebase storage
  async deleteFolder(fileName: string): Promise<string> {
    if (!fileName) {
      throw new Error('File is required');
    }
    const bucket = this.storage.bucket('gs://imago-backup.appspot.com');
    const folder = bucket.file(`images/gz4LtOWvyLekOfpIvapdBVjuXKC3/test/${fileName}`);
    await folder.delete();
    return 'Folder deleted';
  }
}
