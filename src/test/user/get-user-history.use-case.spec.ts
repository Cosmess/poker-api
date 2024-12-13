import { GetUserHistoryUseCase } from '../../application/use-cases/user/get-user-history.use-case';
import { UserHistoryRepositoryInterface } from '../../domain/repositories/user-history.repository.interface';
import { UserHistory } from '../../domain/entities/user-history.entity';

describe('GetUserHistoryUseCase', () => {
  let getUserHistoryUseCase: GetUserHistoryUseCase;
  let userHistoryRepositoryMock: jest.Mocked<UserHistoryRepositoryInterface>;

  beforeEach(() => {
    userHistoryRepositoryMock = {
      findByUser: jest.fn(),
      save: jest.fn(),
    };

    getUserHistoryUseCase = new GetUserHistoryUseCase(userHistoryRepositoryMock);
  });

  it('deve retornar o histórico de um usuário existente', async () => {
    // Arrange
    const userId = 1;
    const mockHistory: UserHistory[] = [
      {
        id: 1,
        user: { id: userId, username: 'test_user', password: 'hashed_password' },
        table: { id: 1, name: 'Test Table',players:[] },
        isWinner: true,
        createdAt: new Date('2024-12-13T12:00:00Z'),
      },
      {
        id: 2,
        user: { id: userId, username: 'test_user', password: 'hashed_password' },
        table: { id: 2, name: 'Another Table' ,players:[] },
        isWinner: false,
        createdAt: new Date('2024-12-14T12:00:00Z'),
      },
    ];

    userHistoryRepositoryMock.findByUser.mockResolvedValueOnce(mockHistory);

    // Act
    const result = await getUserHistoryUseCase.execute(userId);

    // Assert
    expect(userHistoryRepositoryMock.findByUser).toHaveBeenCalledWith(userId);
    expect(result).toEqual(mockHistory);
  });

  it('deve retornar um array vazio se o usuário não tiver histórico', async () => {
    // Arrange
    const userId = 99;

    userHistoryRepositoryMock.findByUser.mockResolvedValueOnce([]);

    // Act
    const result = await getUserHistoryUseCase.execute(userId);

    // Assert
    expect(userHistoryRepositoryMock.findByUser).toHaveBeenCalledWith(userId);
    expect(result).toEqual([]);
  });
});
