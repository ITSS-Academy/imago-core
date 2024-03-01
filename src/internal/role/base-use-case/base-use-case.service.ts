import { Inject, Injectable } from '@nestjs/common';
import {
  errorRoleNotFound,
  Role,
  RoleRepository,
  RoleUseCase,
  tokenDoesNotExit,
} from '../../../domain/role.domain';
import * as admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth';

@Injectable()
export class BaseUseCaseService implements RoleUseCase {
  constructor(@Inject('RoleRepository') private roleRepo: RoleRepository) {}

  async getAllRole(): Promise<Role[]> {
    return await this.roleRepo.getAllRole();
  }

  createRole(role: Role): any {
    return this.roleRepo.createRole(role);
  }

  updateRole(id: string, role: Role): any {
    return this.roleRepo.updateRole(id, role);
  }

  deleteRole(id: string) {
    if (id === 'null') {
      throw errorRoleNotFound;
    }
    return this.roleRepo.deleteRole(id);
  }

  verifyToken(token: string): Promise<DecodedIdToken> {
    if (token === 'null') {
      throw tokenDoesNotExit;
    }
    return this.roleRepo.verifyToken(token);
  }
}