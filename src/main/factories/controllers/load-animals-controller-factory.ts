import { makeDbLoadAnimalsFactory } from '@/main/factories/use-cases'
import { LoadAnimalsController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadAnimalsController = (): Controller => {
  return new LoadAnimalsController(
    makeDbLoadAnimalsFactory()
  )
}
