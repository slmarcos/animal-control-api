import { RequiredFieldValidator, RequiredMongoDbIdValidator, ValidatorComposite } from '@/validation/validators'
import { Validator } from '@/presentation/protocols'
import { MongoDbIdValidatorAdapter } from '@/infra/validators'

export const makeUpdateAnimalValidator = (): ValidatorComposite => {
  const validators: Validator[] = []
  validators.push(new RequiredMongoDbIdValidator('animalId', new MongoDbIdValidatorAdapter()))
  for (const field of ['name', 'age', 'weight', 'type']) {
    validators.push(new RequiredFieldValidator(field))
  }
  return new ValidatorComposite(validators)
}
