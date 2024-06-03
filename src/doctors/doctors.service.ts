import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DoctorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDoctorDto: CreateDoctorDto) {
    try {
      const handleCreation = await this.prisma.$transaction(async (tr) => {
        const user = await tr.user.create({
          data: {
            email: createDoctorDto.user.email,
            firstname: createDoctorDto.user.firstname,
            lastname: createDoctorDto.user.lastname,
            password: createDoctorDto.user.password,
            role: 'DOCTOR',
          },
        });

        const doctor = await tr.doctor.create({
          data: {
            userId: user.id,
            sepecialization: 'skks',
          },
        });
        return { user, doctor };
      });
      return handleCreation;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.doctor.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.doctor.findUnique({
      where: { id },
      include: {
        appointements: true,
      },
    });
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    const updateDoctor = await this.prisma.doctor.update({
      where: {
        id,
      },
      data: {
        sepecialization: updateDoctorDto.sepecialization,
      },
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
