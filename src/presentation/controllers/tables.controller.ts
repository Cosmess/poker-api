import { Controller, Post, Get, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateTableUseCase } from '../../application/use-cases/table/create-table.use-case';
import { ListTablesUseCase } from '../../application/use-cases/table/list-tables.use-case';
import { GetTableByIdUseCase } from '../../application/use-cases/table/get-table-by-id.use-case';
import { DeleteTableUseCase } from '../../application/use-cases/table/delete-table.use-case';
import { CreateTableDto } from '../dto/create-table.dto';
import { AddPlayerDto } from '../dto/add-player.dto';
import { AddPlayerUseCase } from '../../application/use-cases/table/add-player.use-case';

@ApiTags('Tables')
@ApiBearerAuth('access-token')
@Controller('tables')
export class TablesController {
  constructor(
    private readonly createTableUseCase: CreateTableUseCase,
    private readonly listTablesUseCase: ListTablesUseCase,
    private readonly getTableByIdUseCase: GetTableByIdUseCase,
    private readonly deleteTableUseCase: DeleteTableUseCase,
    private readonly addPlayerUseCase: AddPlayerUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova mesa' })
  @ApiResponse({
    status: 201,
    description: 'Mesa criada com sucesso.',
    schema: {
      example: { id: 1, name: 'Mesa 1', players: [] },
    },
  })
  async create(@Body() createTableDto: CreateTableDto) {
    return this.createTableUseCase.execute(createTableDto.name);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as mesas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de mesas.',
    schema: {
      example: [
        { id: 1, name: 'Mesa 1', players: [{ id: 1, username: 'player1' }] },
        { id: 2, name: 'Mesa 2', players: [] },
      ],
    },
  })
  async list() {
    return this.listTablesUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma mesa por ID' })
  @ApiParam({ name: 'id', description: 'ID da mesa', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Mesa encontrada.',
    schema: {
      example: { id: 1, name: 'Mesa 1', players: [{ id: 1, username: 'player1' }] },
    },
  })
  @ApiResponse({ status: 404, description: 'Mesa não encontrada.' })
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.getTableByIdUseCase.execute(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir uma mesa por ID' })
  @ApiParam({ name: 'id', description: 'ID da mesa', example: 1 })
  @ApiResponse({ status: 204, description: 'Mesa excluída com sucesso.' })
  @ApiResponse({ status: 404, description: 'Mesa não encontrada.' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.deleteTableUseCase.execute(id);
    return { message: 'Table deleted successfully' };
  }

  @Post(':id/players')
  @ApiOperation({ summary: 'Adicionar um usuário à mesa' })
  @ApiParam({
    name: 'id',
    description: 'ID da mesa onde o jogador será adicionado',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Jogador adicionado com sucesso.',
    schema: {
      example: { success: true },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao adicionar o jogador (ex.: mesa cheia, jogador inexistente, etc).',
  })
  async addPlayer(
    @Param('id', ParseIntPipe) tableId: number,
    @Body() addPlayerDto: AddPlayerDto,
  ) {
    await this.addPlayerUseCase.execute(tableId, addPlayerDto.userId);
    return { success: true };
  }
}
