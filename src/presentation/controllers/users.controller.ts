import { Controller, Post, Get, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-case';
import { ListUsersUseCase } from '../../application/use-cases/user/list-users.use-case';
import { GetUserByIdUseCase } from '../../application/use-cases/user/get-user-by-id.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/user/delete-user.use-case';
import { CreateUserDto } from '../dto/create-user.dto';
import { Public } from '../decorators/public.decorator';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Public() 
  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso.',
    schema: {
      example: { id: 1, username: 'jane_doe' },
    },
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto.username, createUserDto.password);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários.',
    schema: {
      example: [{ id: 1, username: 'john_doe' }, { id: 2, username: 'jane_doe' }],
    },
  })
  async list() {
    return this.listUsersUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um usuário por ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado.',
    schema: {
      example: { id: 1, username: 'john_doe' },
    },
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.getUserByIdUseCase.execute(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir um usuário por ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário', example: 1 })
  @ApiResponse({ status: 204, description: 'Usuário excluído com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.deleteUserUseCase.execute(id);
    return { message: 'User deleted successfully' };
  }
}
