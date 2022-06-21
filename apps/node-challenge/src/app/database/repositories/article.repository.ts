import { IsNull, Not, Repository } from 'typeorm'
import { IArticle } from '../../common/interfaces'
import { AppDataSource } from '../data.source'
import { Article } from '../entities'

export interface ArticlesFindOption {
  userId: string
  limit?: number
  skip?: number
}

export class ArticleRepository {
  private readonly articleReposiotory: Repository<Article>
  constructor() {
    this.articleReposiotory = AppDataSource.getRepository(Article)
  }

  public create(article: IArticle) {
    const createdArticle = new Article()
    Object.assign(createdArticle, article)
    return this.articleReposiotory.save(createdArticle)
  }

  public async findOne(id: string) {
    return this.articleReposiotory.findBy({ id })
  }

  public update(id: string, updateOptions: Partial<IArticle>) {
    return this.articleReposiotory.update(
      { id },
      {
        ...updateOptions,
      },
    )
  }

  public getArticles({ limit, skip, userId }: ArticlesFindOption) {
    return this.articleReposiotory.find({
      where: [
        { isPrivate: true, published_at: Not(IsNull()) },
        { userId: userId, published_at: Not(IsNull()) },
      ],
      skip: skip || null,
      take: limit || null,
    })
  }

  public async remove(id: string) {
    return this.articleReposiotory.softDelete({ id })
  }
}
