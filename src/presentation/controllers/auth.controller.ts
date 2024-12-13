import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginUserUseCase } from '../../application/use-cases/user/login-user.use-case';
import { LoginDto } from '../dto/login.dto';
import { Public } from '../decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly loginUserUseCase: LoginUserUseCase) {}

  @Public() 
  @Post('login')
  @ApiOperation({ summary: 'Login do usuário' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso.',
    schema: {
      example: { token: 'jwt_token_aqui' },
    },
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
  async login(@Body() loginDto: LoginDto) {
    return this.loginUserUseCase.execute(loginDto.username, loginDto.password);
  }
}
