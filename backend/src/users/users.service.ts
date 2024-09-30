import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Patch,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
import { hash } from "src/hashing";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findUserById(id: number) {
    return await this.userRepo.findOne({ where: { id } });
  }

  async findUserByEmail(email: string) {
    return await this.userRepo.findOne({ where: { email } });
  }

  async getAllUsers() {
    return await this.userRepo.find();
  }

  async createUser(user: CreateUserDto) {
    if (user.password === user.repeatedPassword) {
      const hashedPw = hash(user.password);

      if (hashedPw) {
        const newUser = this.userRepo.create(user);
        return await this.userRepo.save(newUser);
      }

      throw new InternalServerErrorException();
    }

    throw new HttpException("passwords do not match", HttpStatus.BAD_REQUEST, {
      cause: new Error("Passwords do not match"),
    });
  }

  @Patch()
  async updateUser(userId: number, updatedUser: Partial<User>) {
    const userFromDb = await this.findUserById(userId);

    if (userFromDb) {
      return await this.userRepo.update(userId, updatedUser);
    }

    throw new NotFoundException();
  }
}
