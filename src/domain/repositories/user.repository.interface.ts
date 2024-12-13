import { User } from '../entities/user.entity';

export interface UserRepositoryInterface {
  findByUsername(username: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  findAll(): Promise<User[]>;
  save(user: User): Promise<User>;
  deleteById(id: number): Promise<void>;
}
