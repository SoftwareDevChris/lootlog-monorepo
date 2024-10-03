import {
  Controller,
  Post,
  UseGuards,
  Get,
  Res,
  Body,
  HttpStatus,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { Response } from "express";
import { CurrentUser } from "./decorators/current-user.decorator";
import { User } from "src/entities/user.entity";
import { JwtRefreshAuthGuard } from "./guards/jwt-refresh.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { CreateUserDto } from "src/users/dto/createUser.dto";
import { cookieOptions } from "src/cookieOptions";

@Controller("/api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  async signUp(@Body() body: CreateUserDto, @Res() res: Response) {
    return this.authService.createUser(body, res);
  }
  @Post("/login")
  @UseGuards(LocalAuthGuard)
  async login(@CurrentUser() user: User, @Res() res: Response) {
    return this.authService.login(user, res);
  }

  @Post("/logout")
  @UseGuards(JwtAuthGuard)
  async logout(@Res() res: Response) {
    res.clearCookie("session", cookieOptions);
    res.clearCookie("refresh", cookieOptions);
    return res.status(HttpStatus.OK).json({ message: "OK" });
  }

  @Get("/whoami")
  @UseGuards(JwtAuthGuard)
  async getUserDetails(@CurrentUser() user: User) {
    return this.authService.getUserDetails(user.id);
  }

  @Get("/verify")
  @UseGuards(JwtAuthGuard)
  async verifyToken(@CurrentUser() user: User) {
    return true;
  }

  @Get("/refresh")
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(@CurrentUser() user: User, @Res() res: Response) {
    return this.authService.login(user, res);
  }
}
