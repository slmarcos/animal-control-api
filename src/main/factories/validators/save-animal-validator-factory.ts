import { RequiredFieldValidator, ValidatorComposite } from '@/validation/validators'
import { Validator } from '@/presentation/protocols'

export const makeSaveAnimalValidator = (): ValidatorComposite => {
  const validators: Validator[] = []
  for (const field of ['name', 'age', 'weight', 'type']) {
    validators.push(new RequiredFieldValidator(field))
  }
  return new ValidatorComposite(validators)
}
