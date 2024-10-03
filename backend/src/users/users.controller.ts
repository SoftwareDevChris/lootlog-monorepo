import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { User } from "src/entities/user.entity";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller("/api/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers(@CurrentUser() user: User) {
    if (user.isAdmin) {
      return this.usersService.getAllUsers();
    } else throw new ForbiddenException();
  }

  @Get("/find/:id")
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param("id") userId: number, @CurrentUser() user: User) {
    if (user.isAdmin) {
      const userFromDb = await this.usersService.findUserById(userId);
      const { password, refreshToken, ...rest } = userFromDb;
      return rest;
    } else throw new ForbiddenException();
  }

  @Get("/whoami")
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@CurrentUser() user: User) {
    const userFromDb = await this.usersService.findUserById(user.id);
    const { password, refreshToken, ...rest } = userFromDb;
    return rest;
  }

  @Post("/update/:id")
  async updateUser(
    @Param("id") userId: number,
    @CurrentUser() user: User,
    @Body() updatedUser: Partial<User>,
  ) {}
}
