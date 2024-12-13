import { UserHistory } from '../entities/user-history.entity';

export interface UserHistoryRepositoryInterface {
  findByUser(userId: number): Promise<UserHistory[]>;
  save(userHistory: UserHistory): Promise<UserHistory>;
}
