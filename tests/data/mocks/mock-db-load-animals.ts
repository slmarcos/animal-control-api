import { LoadAnimalsRepo } from '@/data/protocols'
import { mockAnimalModel } from '@/tests/domain/mocks'

export class LoadAnimalsRepoSpy implements LoadAnimalsRepo {
  calls = 0
  result: LoadAnimalsRepo.Result = [
    mockAnimalModel(),
    mockAnimalModel()
  ]

  async load (): Promise<LoadAnimalsRepo.Result> {
    this.calls++
    return this.result
  }
}
