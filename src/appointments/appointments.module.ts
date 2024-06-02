import { Module } from '@nestjs/common';
import { AppointementsService } from './appointments.service';
import { AppointementsController } from './appointments.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AppointementsController],
  providers: [AppointementsService],
  imports: [PrismaModule],
})
export class AppointementsModule {}
