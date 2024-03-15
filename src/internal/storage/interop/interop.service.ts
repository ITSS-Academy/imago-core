import { Inject, Injectable } from '@nestjs/common';
import { ErrorFileRequired, ErrorFileUndefined, StorageDomain, StorageInterop, StorageUseCase } from '../../../domain/storage.domain';
import { AuthUseCase } from '../../../domain/auth.domain';

@Injectable()
export class InteropService implements StorageInterop {
  constructor(@Inject('StorageUseCase') private storageUsecase: StorageUseCase,
    @Inject('AuthUseCase') private authUsecase: AuthUseCase) { }

  async uploadFile(files: Express.Multer.File[], storage: StorageDomain, token: string): Promise<string[]> {
    try {
      return await this.storageUsecase.uploadFile(files, storage);
    } catch (e) {
      throw e;
    }
  }
  //delete file from firebase storage
  async deleteFolder(fileName: string, token: string): Promise<string> {
    if (!fileName) {
      throw ErrorFileRequired;
    }
    return await this.storageUsecase.deleteFolder(fileName);
  }
}
