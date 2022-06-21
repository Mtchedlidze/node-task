import { IsString, Length, Validate } from 'class-validator'
import { IsValidSlug } from './slug.validator'

export class ArticleDTO {
  @IsString()
  @Length(3, 20)
  title: string

  @IsString()
  userID: string

  @IsString()
  @Validate(IsValidSlug, {
    message: 'slug is not valid format',
  })
  slug: string

  @IsString()
  userId: string
}
