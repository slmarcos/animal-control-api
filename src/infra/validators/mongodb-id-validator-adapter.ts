import { MongoDbIdValidator } from '@/validation/protocols'

import validator from 'validator'

export class MongoDbIdValidatorAdapter implements MongoDbIdValidator {
  isMongoDbId (id: string): boolean {
    return validator.isMongoId(id)
  }
}
