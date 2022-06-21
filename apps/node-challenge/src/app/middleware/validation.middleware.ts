import { validate, ValidationError } from 'class-validator'
import { ClassConstructor, plainToClass } from 'class-transformer'
import { Request, Response, NextFunction } from 'express'
import { OutgoingMessage } from 'http'

export const validator = (MetaType: ClassConstructor<any>) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<OutgoingMessage> => {
    let property: Record<string, any> = {}
    Object.assign(property, req.body, req.params, req.query)

    const object: Record<string, any> = plainToClass(MetaType, property)
    const errorsResponse: ValidationError[] = await validate(object)

    const errorMessage = errorsResponse.map(
      (val: ValidationError) => Object.values(val.constraints)[0],
    )
    if (errorMessage.length > 0) {
      return res.status(400).json({ errors: errorMessage })
    }
    next()
  }
}
