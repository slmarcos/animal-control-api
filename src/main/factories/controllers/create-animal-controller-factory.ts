import { makeCreateAnimalValidator } from '@/main/factories/validators'
import { makeDbSaveAnimal } from '@/main/factories/use-cases'
import { CreateAnimalController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeCreateAnimalController = (): Controller => {
  return new CreateAnimalController(
    makeCreateAnimalValidator(),
    makeDbSaveAnimal()
  )
}
