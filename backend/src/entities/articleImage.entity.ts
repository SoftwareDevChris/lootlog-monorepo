import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";

import { Article } from "./article.entity";

@Entity()
export class ArticleImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @OneToOne(() => Article, (article) => article.image)
  article: Article;
}
