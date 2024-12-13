import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './domain/entities/user.entity';
import { Table } from './domain/entities/table.entity';
import { AuthController } from './presentation/controllers/auth.controller';
import { UsersController } from './presentation/controllers/users.controller';
import { TablesController } from './presentation/controllers/tables.controller';
import { SimulationController } from './presentation/controllers/simulation.controller';
import { TypeORMUserRepository } from './infrastructure/repositories/typeorm-user.repository';
import { TypeORMTableRepository } from './infrastructure/repositories/typeorm-table.repository';
import { CreateUserUseCase } from './application/use-cases/user/create-user.use-case';
import { LoginUserUseCase } from './application/use-cases/user/login-user.use-case';
import { CreateTableUseCase } from './application/use-cases/table/create-table.use-case';
import { AddPlayerUseCase } from './application/use-cases/table/add-player.use-case';
import { SimulateResultUseCase } from './application/use-cases/simulate-result.use-case';
import { JwtModule } from '@nestjs/jwt';
import { ListUsersUseCase } from './application/use-cases/user/list-users.use-case';
import { GetUserByIdUseCase } from './application/use-cases/user/get-user-by-id.use-case';
import { DeleteUserUseCase } from './application/use-cases/user/delete-user.use-case';
import { ListTablesUseCase } from './application/use-cases/table/list-tables.use-case';
import { GetTableByIdUseCase } from './application/use-cases/table/get-table-by-id.use-case';
import { DeleteTableUseCase } from './application/use-cases/table/delete-table.use-case';
import { JwtAuthGuard } from './presentation/guards/jwt-auth.guard';
import { Reflector } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { TypeORMUserHistoryRepository } from './infrastructure/repositories/typeorm-user-history.repository';
import { GetUserHistoryUseCase } from './application/use-cases/user/get-user-history.use-case';
import { UserHistory } from './domain/entities/user-history.entity';
import { UserHistoryController } from './presentation/controllers/user-history.controller';
import { databaseConfig } from './infrastructure/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseConfig, // Usa a configuração do arquivo database.config.ts
    }),
    TypeOrmModule.forFeature([User, Table,UserHistory]),
    AuthModule,
  ],
  controllers: [AuthController, UsersController, TablesController, SimulationController,UserHistoryController],
  providers: [
    Reflector,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
    {
      provide: 'UserRepositoryInterface',
      useClass: TypeORMUserRepository,
    },
    {
      provide: 'TableRepositoryInterface',
      useClass: TypeORMTableRepository,
    },
    {
      provide: 'UserHistoryRepositoryInterface',
      useClass: TypeORMUserHistoryRepository,
    },
    CreateUserUseCase,
    ListUsersUseCase,
    GetUserByIdUseCase,
    DeleteUserUseCase,
    LoginUserUseCase,
    CreateTableUseCase,
    ListTablesUseCase,
    GetTableByIdUseCase,
    DeleteTableUseCase,
    AddPlayerUseCase,
    GetUserHistoryUseCase,
    SimulateResultUseCase,
  ],
})
export class AppModule {}
