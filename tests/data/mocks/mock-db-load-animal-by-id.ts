import { LoadAnimalByIdRepo } from '@/data/protocols'
import { mockAnimalModel } from '@/tests/domain/mocks'

export class LoadAnimalByIdRepoSpy implements LoadAnimalByIdRepo {
  params!: LoadAnimalByIdRepo.Params
  result: LoadAnimalByIdRepo.Result = mockAnimalModel()

  async load (id: LoadAnimalByIdRepo.Params): Promise<LoadAnimalByIdRepo.Result> {
    this.params = id
    return this.result
  }
}
