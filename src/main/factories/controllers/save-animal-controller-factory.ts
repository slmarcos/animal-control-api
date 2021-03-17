import { makeSaveAnimalValidator } from '@/main/factories/validators'
import { makeDbLoadAnimalByIdFactory, makeDbSaveAnimal } from '@/main/factories/use-cases'
import { SaveAnimalController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeSaveAnimalController = (): Controller => {
  return new SaveAnimalController(
    makeSaveAnimalValidator(),
    makeDbLoadAnimalByIdFactory(),
    makeDbSaveAnimal()
  )
}
