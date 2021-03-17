import { RequiredFieldValidator, ValidatorComposite } from '@/validation/validators'
import { Validator } from '@/presentation/protocols'

export const makeSaveAnimalValidator = (): ValidatorComposite => {
  const validations: Validator[] = []
  for (const field of ['name', 'age', 'weight', 'type']) {
    validations.push(new RequiredFieldValidator(field))
  }
  return new ValidatorComposite(validations)
}
