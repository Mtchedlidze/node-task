import { IArticle } from '../common/interfaces'
import {
  ArticleRepository,
  ArticlesFindOption,
} from '../database/repositories/article.repository'
import { v4 as randomID } from 'uuid'

export class ArticleService {
  private readonly articleRepository: ArticleRepository

  constructor() {
    this.articleRepository = new ArticleRepository()
  }

  public async create(article: IArticle) {
    article.id = randomID()
    return this.articleRepository.create(article)
  }

  public async update(id: string, fields: Partial<IArticle>) {
    const articleExists = await this.articleRepository.findOne(id)
    if (!articleExists) {
      throw new Error('article does not exists')
    }
    return this.articleRepository.update(id, fields)
  }

  public async getArticles(options: ArticlesFindOption) {
    return this.articleRepository.getArticles(options)
  }

  public async getOneArtice(id: string) {
    const article = await this.articleRepository.findOne(id)

    if (!article) {
      throw new Error('article does not exists')
    }

    return article
  }

  public async remove(id: string) {
    const articleExists = await this.articleRepository.findOne(id)
    if (!articleExists) {
      throw new Error('article does not exists')
    }

    return this.articleRepository.remove(id)
  }

  public async publishArticle(id: string) {
    const articleExists = await this.articleRepository.findOne(id)
    if (!articleExists) {
      throw new Error('article does not exists')
    }

    return this.articleRepository.update(id, {
      published_at: new Date(),
    })
  }
}
