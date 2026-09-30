import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ required: true, example: 'admin@techsolutions.com' })
  email: string;

  @ApiProperty({ required: true, example: 'Password123!' })
  password: string;
}