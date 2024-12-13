import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-case';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepositoryMock: jest.Mocked<UserRepositoryInterface>;

  beforeEach(() => {
    userRepositoryMock = {
      save: jest.fn(),
      findByUsername: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      deleteById: jest.fn(),
    };

    createUserUseCase = new CreateUserUseCase(userRepositoryMock);
  });

  it('deve criar um usuário com senha criptografada', async () => {
    // Arrange
    const username = 'test_user';
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const savedUser = new User();
    savedUser.username = username;
    savedUser.password = hashedPassword

    userRepositoryMock.save.mockResolvedValueOnce(savedUser);

    // Act
    const result = await createUserUseCase.execute(username, password);

    // Assert
    expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
    expect(userRepositoryMock.save).toHaveBeenCalledWith(expect.objectContaining({
      username,
      password: hashedPassword,
    }));
    expect(result).toEqual(savedUser);
  });

  it('deve lançar erro caso o repositório falhe ao salvar o usuário', async () => {
    // Arrange
    const username = 'test_user';
    const password = 'password123';


    userRepositoryMock.save.mockRejectedValueOnce(new Error('Database error'));

    // Act & Assert
    await expect(createUserUseCase.execute(username, password)).rejects.toThrow('Database error');
  });
});
