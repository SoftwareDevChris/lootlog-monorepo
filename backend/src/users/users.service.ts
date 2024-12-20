import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { hash } from "src/hashing";
import { User } from "src/entities/user.entity";

import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findUserById(id: number) {
    return await this.userRepo.findOne({ where: { id } });
  }

  async findUserByEmail(email: string) {
    return await this.userRepo.findOne({ where: { email } });
  }

  async getUserArticles(userId: number) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ["articles"],
    });
    console.log("Get user articles:", user.articles);
    return user.articles;
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

  async updateUser(userId: number, newValues: Partial<UpdateUserDto>) {
    const userFromDb = await this.findUserById(userId);

    if (userFromDb) {
      const mergedUser = { ...userFromDb, ...newValues };
      return await this.userRepo.update(userFromDb.id, mergedUser);
    }

    throw new NotFoundException();
  }

  async deleteUser(userId: number) {
    const userFromDb = await this.findUserById(userId);
    if (userFromDb) {
      const removedUser = await this.userRepo.remove(userFromDb);
      console.log("Removed user:", removedUser);
      return removedUser;
    } else throw new NotFoundException();
  }
}
