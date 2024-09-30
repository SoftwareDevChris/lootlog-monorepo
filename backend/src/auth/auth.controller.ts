import { Controller, Post, UseGuards, Get, Res, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { Response } from "express";
import { CurrentUser } from "./decorators/current-user.decorator";
import { User } from "src/entities/user.entity";
import { JwtRefreshAuthGuard } from "./guards/jwt-refresh.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { CreateUserDto } from "src/users/dto/createUser.dto";

@Controller("/api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  @UseGuards(LocalAuthGuard)
  async login(@CurrentUser() user: User, @Res() res: Response) {
    return this.authService.login(user, res);
  }

  @Post("/signup")
  async signUp(@Body() body: CreateUserDto, @Res() res: Response) {
    return this.authService.createUser(body, res);
  }

  @Get("/whoami")
  @UseGuards(JwtAuthGuard)
  async getUserDetails(@CurrentUser() user: User) {
    return this.authService.getUserDetails(user.id);
  }

  @Get("/refresh")
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(@CurrentUser() user: User, @Res() res: Response) {
    return this.authService.login(user, res);
  }
}
