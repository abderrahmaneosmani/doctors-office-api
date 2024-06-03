import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashPassword;
    const create = await this.prisma.user.create({
      data: createUserDto,
    });
    if (!create.id) {
      throw new BadRequestException('cant create user');
    }
    return create.id;
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        role: true,
      },
    });
    if (users.length) return users;
  }

  async findOne(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        role: true,
      },
    });
    if (!user.id) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<number> {
    const updateUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
    if (!updateUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updateUser?.id;
  }

  async remove(id: number): Promise<number> {
    const deleteUser = await this.prisma.user.delete({
      where: { id },
    });

    if (!deleteUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return deleteUser?.id;
  }
  async findUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user?.id) {
      throw new NotFoundException(`User with ID ${email} not found`);
    }
    return user;
  }
}
