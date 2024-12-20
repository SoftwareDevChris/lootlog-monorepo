import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { UsersController } from "./users.controller";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, JwtAuthGuard],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
