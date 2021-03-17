import { InvalidParamError } from '@/presentation/errors'
import { Validator } from '@/presentation/protocols'
import { MongoDbIdValidator } from '@/validation/protocols'

export class RequiredMongoDbIdValidator implements Validator {
  constructor (
    private readonly fieldName: string,
    private readonly mongoIdValidator: MongoDbIdValidator
  ) { }

  validate (input: any): Error | null {
    const isValid = this.mongoIdValidator.isMongoDbId(input[this.fieldName])
    return !isValid ? new InvalidParamError(this.fieldName) : null
  }
}
