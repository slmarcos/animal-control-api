import { makeLoadAnimalByIdValidator } from '@/main/factories/validators'
import { makeDbLoadAnimalByIdFactory } from '@/main/factories/use-cases'
import { LoadAnimalByIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadAnimalByIdController = (): Controller => {
  return new LoadAnimalByIdController(
    makeLoadAnimalByIdValidator(),
    makeDbLoadAnimalByIdFactory()
  )
}
