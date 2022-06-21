import { UserRepository } from '../database/repositories/user.repository'
import { PasswordService } from '../services/password.service'
import { JwtPayload, sign, verify } from 'jsonwebtoken'

export class AuthService {
  private readonly passwordService: PasswordService
  private readonly userRepository: UserRepository

  constructor() {
    this.passwordService = new PasswordService()
    this.userRepository = new UserRepository()
  }

  public async validate(
    username: string,
    password: string
  ): Promise<string | null> {
    const user = await this.userRepository.findOne({ username })
    if (!user) return null

    const isPasswordValid = await this.passwordService.comparePasswords(
      password,
      user.password
    )

    if (!isPasswordValid) return null

    return this.signJWT({
      username: user.username,
      userId: user.id,
    })
  }

  private signJWT(payload: object): string {
    return sign(payload, 'secret', {
      expiresIn: '1h',
    })
  }

  public async validateToken(token: string): Promise<JwtPayload | string> {
    return new Promise((resolve, reject) => {
      verify(token, 'secret', (err, decoded) => {
        if (err) {
          reject(err)
        }
        resolve(decoded)
      })
    })
  }
}
