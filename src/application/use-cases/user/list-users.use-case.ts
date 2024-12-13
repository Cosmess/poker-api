import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { UserRepositoryInterface } from '../../../domain/repositories/user.repository.interface';
import { User } from '../../../domain/entities/user.entity';

@Injectable()
export class ListUsersUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
