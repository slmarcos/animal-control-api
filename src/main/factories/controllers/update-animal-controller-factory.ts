import { makeUpdateAnimalValidator } from '@/main/factories/validators'
import { makeDbLoadAnimalByIdFactory, makeDbSaveAnimal } from '@/main/factories/use-cases'
import { UpdateAnimalController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeUpdateAnimalController = (): Controller => {
  return new UpdateAnimalController(
    makeUpdateAnimalValidator(),
    makeDbLoadAnimalByIdFactory(),
    makeDbSaveAnimal()
  )
}
