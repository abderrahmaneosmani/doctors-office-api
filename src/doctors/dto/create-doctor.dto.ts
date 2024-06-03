import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateDoctorDto {
  @ApiProperty()
  user: CreateUserDto;
  @ApiProperty()
  sepecialization: string;
}
