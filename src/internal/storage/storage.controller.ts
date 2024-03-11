import {
  Body,
  Controller,
  Delete,
  FileTypeValidator, Get, Headers,
  Inject,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { storage } from 'firebase-admin';
import { url } from 'inspector';
import { StorageDomain, StorageInterop } from 'src/domain/storage.domain';

@Controller('v1/storage')
export class StorageController {
  constructor(@Inject('StorageInterop') private storageInterop: StorageInterop) { }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(@Body() storage: StorageDomain,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
          new FileTypeValidator({ fileType: '.(jpg|jpeg|png)' })
        ]
      })
    ) files: Express.Multer.File[], @Headers() headers: any
  ) {
    try {
      let token = headers['authorization'];
      return this.storageInterop.uploadFile(files, storage, token);
    } catch (error) {
      throw error;
    }
  }
  //delete folder from firebase storage
  @Delete()
  async deleteFolder(@Body() fileName: string, @Headers() headers: any) {
    try {
      let token = headers['authorization'];
      console.log(fileName);
      return this.storageInterop.deleteFolder(fileName, token);
    } catch (error) {
      throw error;
    }
  }
}