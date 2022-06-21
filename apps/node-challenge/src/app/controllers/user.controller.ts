import { Request, Response } from 'express'
import { UserService } from '../services/user.service'

export class UserController {
  private readonly userService: UserService
  constructor() {
    this.userService = new UserService()
  }

  public async create(req: Request, res: Response) {
    try {
      const user = await this.userService.create(req.body)

      return res
        .status(201)
        .send({ response: `user with username ${user.username} created` })
    } catch (error) {
      return res.status(400).send({ error: error.message })
    }
  }

  public async findOne(req: Request, res: Response) {
    try {
      const user = await this.userService.findOne(
        req.query.id as string,
        req.query.username as string,
      )

      return res.status(200).send({ response: user })
    } catch (error) {
      return res.status(400).send({ error: error.message })
    }
  }
}
