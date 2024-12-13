import { ListUsersUseCase } from '../../application/use-cases/user/list-users.use-case';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';

describe('ListUsersUseCase', () => {
  let listUsersUseCase: ListUsersUseCase;
  let userRepositoryMock: jest.Mocked<UserRepositoryInterface>;

  beforeEach(() => {
    userRepositoryMock = {
      save: jest.fn(),
      findByUsername: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      deleteById: jest.fn(),
    };

    listUsersUseCase = new ListUsersUseCase(userRepositoryMock);
  });

  it('deve retornar uma lista de usuários', async () => {
    // Arrange
    const mockUsers: User[] = [
      { id: 1, username: 'user1', password: 'hashed_password1' },
      { id: 2, username: 'user2', password: 'hashed_password2' },
    ];

    userRepositoryMock.findAll.mockResolvedValueOnce(mockUsers);

    // Act
    const result = await listUsersUseCase.execute();

    // Assert
    expect(userRepositoryMock.findAll).toHaveBeenCalled();
    expect(result).toEqual(mockUsers);
  });

  it('deve retornar uma lista vazia se nenhum usuário for encontrado', async () => {
    // Arrange
    userRepositoryMock.findAll.mockResolvedValueOnce([]);

    // Act
    const result = await listUsersUseCase.execute();

    // Assert
    expect(userRepositoryMock.findAll).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
