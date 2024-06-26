import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateCredentialDto } from './dto/credential.dto';
import { Public } from './utils';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: CreateCredentialDto) {
    return this.authService.signIn(signInDto.email, signInDto.password, 'USER');
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('doctor/login')
  signInDoctor(@Body() signInDto: CreateCredentialDto) {
    return this.authService.signIn(
      signInDto.email,
      signInDto.password,
      'DOCTOR',
    );
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('patient/login')
  signInPatient(@Body() signInDto: CreateCredentialDto) {
    return this.authService.signIn(
      signInDto.email,
      signInDto.password,
      'PATIENT',
    );
  }
}
