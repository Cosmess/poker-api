import { GetUserByIdUseCase } from '../../application/use-cases/user/get-user-by-id.use-case';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('GetUserByIdUseCase', () => {
  let getUserByIdUseCase: GetUserByIdUseCase;
  let userRepositoryMock: jest.Mocked<UserRepositoryInterface>;

  beforeEach(() => {
    userRepositoryMock = {
      save: jest.fn(),
      findByUsername: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      deleteById: jest.fn(),
    };

    getUserByIdUseCase = new GetUserByIdUseCase(userRepositoryMock);
  });

  it('deve retornar um usuário existente', async () => {
    // Arrange
    const userId = 1;
    const mockUser: User = {
      id: userId,
      username: 'test_user',
      password: 'hashed_password',
    };

    userRepositoryMock.findById.mockResolvedValueOnce(mockUser);

    // Act
    const result = await getUserByIdUseCase.execute(userId);

    // Assert
    expect(userRepositoryMock.findById).toHaveBeenCalledWith(userId);
    expect(result).toEqual(mockUser);
  });

  it('deve lançar NotFoundException se o usuário não existir', async () => {
    // Arrange
    const userId = 99;

    userRepositoryMock.findById.mockResolvedValueOnce(null);

    // Act & Assert
    await expect(getUserByIdUseCase.execute(userId)).rejects.toThrow(NotFoundException);
    expect(userRepositoryMock.findById).toHaveBeenCalledWith(userId);
  });
});
