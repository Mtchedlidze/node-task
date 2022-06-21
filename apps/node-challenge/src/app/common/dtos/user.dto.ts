import { IsString, Length } from 'class-validator'

export class UserDTO {
  @IsString()
  @Length(3, 20)
  username: string

  @Length(5, 20)
  @IsString()
  password: string
}
