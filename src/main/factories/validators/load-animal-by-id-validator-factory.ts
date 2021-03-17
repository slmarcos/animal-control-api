import { RequiredMongoDbIdValidator, ValidatorComposite } from '@/validation/validators'
import { Validator } from '@/presentation/protocols'
import { MongoDbIdValidatorAdapter } from '@/infra/validators'

export const makeLoadAnimalByIdValidator = (): ValidatorComposite => {
  const validators: Validator[] = []
  validators.push(new RequiredMongoDbIdValidator('animalId', new MongoDbIdValidatorAdapter()))
  return new ValidatorComposite(validators)
}
