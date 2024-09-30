import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
} from "typeorm";

import { Category } from "./category.entity";
import { User } from "./user.entity";
import { ArticleImage } from "./articleImage.entity";

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 200 })
  subtitle: string;

  @Column()
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  isPublic: boolean;

  @Column()
  isFeatured: boolean;

  @OneToOne(() => ArticleImage, (image) => image.article)
  image: ArticleImage;

  @Column({ nullable: true })
  YTVideoId: string;

  @ManyToOne(() => User, (user) => user.articles)
  author: User;

  @ManyToOne(() => Category, (category) => category.articles)
  category: Category;
}
