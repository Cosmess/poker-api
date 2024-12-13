import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'O nome de usuário do novo usuário',
    example: 'jane_doe',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'A senha do novo usuário',
    example: 'password123',
  })
  @IsString()
  password: string;
}
