import { NextFunction, Request, Response } from 'express'
import { AuthService } from './auth.service'

export class AuthMiddleware {
  private readonly authService: AuthService
  constructor() {
    this.authService = new AuthService()
  }
  public async login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body

    if (!password || !username)
      return res.status(401).json({ message: 'unauthorized' })

    const token = await this.authService.validate(username, password)
    if (!token) return res.status(401).json({ message: 'unauthorized' })

    return res
      .cookie('token', token, {
        httpOnly: true,
      })
      .status(200)
      .json({ message: 'authorized' })
  }

  public async validateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token

    if (!token) return res.status(401).json({ error: 'unauthorized' })

    try {
      const decoded = await this.authService.validateToken(token)
      req['user'] = decoded
      return next()
    } catch (error) {
      res.status(401).json({ error: 'unauthorized' })
    }
  }
}
