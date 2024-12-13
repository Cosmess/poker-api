import { LoginUserUseCase } from '../../application/use-cases/user/login-user.use-case';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('LoginUserUseCase', () => {
  let loginUserUseCase: LoginUserUseCase;
  let userRepositoryMock: jest.Mocked<UserRepositoryInterface>;
  let jwtServiceMock: jest.Mocked<JwtService>;

  beforeEach(() => {
    userRepositoryMock = {
      save: jest.fn(),
      findByUsername: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      deleteById: jest.fn(),
    };

    jwtServiceMock = {
      sign: jest.fn(),
    } as unknown as jest.Mocked<JwtService>;

    loginUserUseCase = new LoginUserUseCase(userRepositoryMock, jwtServiceMock);
  });

  it('deve gerar um token JWT válido para credenciais corretas', async () => {
    // Arrange
    const username = 'test_user';
    const password = 'test_password';
    const user = { id: 1, username, password: 'hashed_password' };

    const token = 'valid_jwt_token';

    userRepositoryMock.findByUsername.mockResolvedValueOnce(user);
    jwtServiceMock.sign.mockReturnValueOnce(token);

    // Act
    const result = await loginUserUseCase.execute(username, password);

    // Assert
    expect(userRepositoryMock.findByUsername).toHaveBeenCalledWith(username);
    expect(jwtServiceMock.sign).toHaveBeenCalledWith({ sub: user.id, username: user.username });
    expect(result).toEqual({ token });
  });

  it('deve lançar UnauthorizedException para credenciais inválidas', async () => {
    // Arrange
    const username = 'wrong_user';
    const password = 'wrong_password';

    userRepositoryMock.findByUsername.mockResolvedValueOnce(null);

    // Act & Assert
    await expect(loginUserUseCase.execute(username, password)).rejects.toThrow(UnauthorizedException);
    expect(userRepositoryMock.findByUsername).toHaveBeenCalledWith(username);
    expect(jwtServiceMock.sign).not.toHaveBeenCalled();
  });
});
