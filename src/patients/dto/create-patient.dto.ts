import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreatePatientDto {
  @ApiProperty()
  user: CreateUserDto;
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  date_of_brirh: string;
  @ApiProperty()
  address: string;
}
