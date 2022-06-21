import { pbkdf2 as hash, randomBytes } from 'crypto'
import { promisify } from 'util'

export class PasswordService {
  private readonly hashService = promisify(hash)

  public async encryptPassword(
    passwod: string,
    salt = randomBytes(16).toString('hex'),
  ): Promise<string> {
    const iterations = 1000
    const keylen = 16
    const algorythm = 'sha256'

    const encryptedPassword = await this.hashService(
      passwod,
      salt,
      iterations,
      keylen,
      algorythm,
    )

    return [encryptedPassword.toString('hex'), salt].join('.')
  }

  public async comparePasswords(
    password: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    const [, salt] = encryptedPassword.split('.')
    password = await this.encryptPassword(password, salt)
    return password === encryptedPassword
  }
}
