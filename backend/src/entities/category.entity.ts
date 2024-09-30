import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { Article } from "./article.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Article, (article) => article.category)
  articles: Article[];
}
