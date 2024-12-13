import { DeleteUserUseCase } from '../../application/use-cases/user/delete-user.use-case';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';
import { NotFoundException } from '@nestjs/common';

describe('DeleteUserUseCase', () => {
  let deleteUserUseCase: DeleteUserUseCase;
  let userRepositoryMock: jest.Mocked<UserRepositoryInterface>;

  beforeEach(() => {
    userRepositoryMock = {
      save: jest.fn(),
      findByUsername: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      deleteById: jest.fn(),
    };

    deleteUserUseCase = new DeleteUserUseCase(userRepositoryMock);
  });

  it('deve excluir um usuário existente', async () => {
    // Arrange
    const userId = 1;

    userRepositoryMock.findById.mockResolvedValueOnce({ 
      id: userId, 
      username: 'test_user', 
      password: 'hashed_password' 
    });

    userRepositoryMock.deleteById.mockResolvedValueOnce();

    // Act
    await deleteUserUseCase.execute(userId);

    // Assert
    expect(userRepositoryMock.findById).toHaveBeenCalledWith(userId);
    expect(userRepositoryMock.deleteById).toHaveBeenCalledWith(userId);
  });

  it('deve lançar NotFoundException se o usuário não existir', async () => {
    // Arrange
    const userId = 99;

    userRepositoryMock.findById.mockResolvedValueOnce(null);

    // Act & Assert
    await expect(deleteUserUseCase.execute(userId)).rejects.toThrow(NotFoundException);
    expect(userRepositoryMock.findById).toHaveBeenCalledWith(userId);
    expect(userRepositoryMock.deleteById).not.toHaveBeenCalled();
  });
});
