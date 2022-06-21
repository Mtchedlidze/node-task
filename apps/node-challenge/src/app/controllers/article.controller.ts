import { validate } from 'class-validator'
import { Request, Response } from 'express'
import { FindOptionsWhere } from 'typeorm'
import { ArticleDTO } from '../common/dtos/article.dto'
import { Article } from '../database/entities'
import { ArticleService } from '../services/article.service'

export class ArticleController {
  private readonly articleService: ArticleService
  constructor() {
    this.articleService = new ArticleService()
  }
  public async create({ body: articleData }: Request, res: Response) {
    try {
      const response = await this.articleService.create(articleData)
      return res.status(201).send({ response })
    } catch (error) {
      res.status(400).send({ error: error.message })
    }
  }

  public async update(
    { body: articleUpdateOptions, params }: Request,
    res: Response,
  ) {
    try {
      const response = await this.articleService.update(
        params.id,
        articleUpdateOptions,
      )

      return res.status(200).send({ response })
    } catch (error) {
      res.status(400).send({ error: error.message })
    }
  }

  public async remove({ params }: Request, res: Response) {
    try {
      const response = await this.articleService.remove(params.id)
      return res.status(200).send({ response })
    } catch (error) {
      return res.status(400).send({ error: error.message })
    }
  }

  public async getArticles(req: Request, res: Response) {
    try {
      console.log(req['user'])
      const id = req['user'].userId
      const articles = await this.articleService.getArticles({
        userId: id,
        skip: +req.query.skip,
        limit: +req.query.limit,
      })

      return res.status(200).send({ response: articles })
    } catch (error) {
      return res.status(400).send({ error: error.message })
    }
  }

  public async getOneArticle({ params }: Request, res: Response) {
    try {
      const article = await this.articleService.getOneArtice(params.id)
      return res.status(200).send({ response: article })
    } catch (error) {
      return res.status(400).send({ error: error.message })
    }
  }

  public async publishArticle(req: Request, res: Response) {
    try {
      await this.articleService.publishArticle(req.params.id)

      return res
        .status(200)
        .send({ response: `article withi id ${req.params.id} published` })
    } catch (error) {}
  }
}
