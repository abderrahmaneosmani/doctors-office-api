import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DoctorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDoctorDto: CreateDoctorDto) {
    const doctor = await this.prisma.doctor.create({
      data: createDoctorDto,
    });
    if (!doctor) {
      throw new BadGatewayException('Cant create a doctor');
    }
    return doctor;
  }

  async findAll() {
    return await this.prisma.doctor.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.doctor.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    const updateDoctor = await this.prisma.doctor.update({
      where: {
        id,
      },
      data: updateDoctorDto,
    });
    return updateDoctor;
  }

  async remove(id: number) {
    await this.prisma.doctor.delete({
      where: {
        id: id,
      },
    });
  }
}
