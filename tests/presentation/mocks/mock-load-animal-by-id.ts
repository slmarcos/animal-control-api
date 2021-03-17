import { LoadAnimalById } from '@/domain/use-cases'
import { mockAnimalModel } from '@/tests/domain/mocks'

export class LoadAnimalByIdSpy implements LoadAnimalById {
  params!: LoadAnimalById.Params
  result: LoadAnimalById.Result = mockAnimalModel()

  async load (id: LoadAnimalById.Params): Promise<LoadAnimalById.Result> {
    this.params = id
    return this.result
  }
}
