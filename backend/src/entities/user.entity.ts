import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { Article } from "./article.entity";

export const userRoles = ["USER", "AUTHOR", "ADMIN"] as const;

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ length: 200, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: "USER" })
  role: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  refreshToken?: string;

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];
}
