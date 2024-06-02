import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPatientDto: CreatePatientDto) {
    const date_birth = new Date(createPatientDto.date_of_brirh);

    return await this.prisma.patient.create({
      data: {
        ...createPatientDto,
        date_of_brirh: date_birth,
      },
    });
  }

  async findAll() {
    return await this.prisma.patient.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.patient.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    return await this.prisma.patient.update({
      where: { id },
      data: updatePatientDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.patient.delete({
      where: { id },
    });
  }
}
