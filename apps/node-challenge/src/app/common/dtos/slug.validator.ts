import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

@ValidatorConstraint()
export class IsValidSlug implements ValidatorConstraintInterface {
  validate(slug: string): boolean {
    const slugRegex = /^[^\s!?.\/.*#|]+$/
    return slugRegex.test(slug)
  }
}
