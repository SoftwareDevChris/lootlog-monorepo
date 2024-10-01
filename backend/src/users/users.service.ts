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
      const hashedPw = await hash(user.password);

      if (hashedPw) {
        // Convert name and email to lowercase before adding user to database
        const newUser: Partial<User> = {
          firstName: user.firstName.toLowerCase(),
          lastName: user.lastName.toLowerCase(),
          email: user.email.toLowerCase(),
          password: hashedPw,
        };

        // Save user to database
        const createNewUser = this.userRepo.create(newUser);
        return await this.userRepo.save(createNewUser);
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
