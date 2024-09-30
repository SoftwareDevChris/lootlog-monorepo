import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { hash, compare } from "src/hashing";
import { UsersService } from "src/users/users.service";
import { createDateFromNow } from "src/createDateFromNow";
import { User } from "src/entities/user.entity";
import { CreateUserDto } from "src/users/dto/createUser.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async verifyEmailPassword(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);

    if (user) {
      const isPasswordMatch = await compare(password, user.password);

      if (isPasswordMatch) {
        const { password, ...result } = user;
        return result;
      }
    }

    throw new UnauthorizedException("Wrong email or password");
  }

  async verifyRefreshToken(token: string, userId: number) {
    const user = await this.usersService.findUserById(userId);

    if (user) {
      const isTokenValid = await compare(token, user.refreshToken);

      if (isTokenValid) return user;
    }

    throw new ForbiddenException();
  }

  async login(user: User, res: Response) {
    const payload = { email: user.email, firstName: user.firstName };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_MS}ms`,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRATION_MS}ms`,
    });

    const accessTokenExpirationDate = createDateFromNow(
      process.env.JWT_ACCESS_TOKEN_EXPIRATION_MS,
    );

    const refreshTokenExpirationDate = createDateFromNow(
      process.env.JWT_REFRESH_TOKEN_EXPIRATION_MS,
    );

    await this.usersService.updateUser(user.id, {
      refreshToken: await hash(refreshToken),
    });

    res.cookie("session", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      expires: accessTokenExpirationDate,
    });

    res.cookie("refresh", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      expires: refreshTokenExpirationDate,
    });

    return res.status(HttpStatus.OK).json({ message: "OK" });
  }

  async createUser(user: CreateUserDto, res: Response) {
    const newUser = await this.usersService.createUser(user);

    if (newUser) {
      return this.login(newUser, res);
    }

    throw new ForbiddenException("Failed to create user");
  }

  async getUserDetails(userId: number) {
    return await this.usersService.findUserById(userId);
  }
}
