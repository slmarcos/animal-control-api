import { SaveAnimalRepo } from '@/data/protocols'
import { mockAnimalModel } from '@/tests/domain/mocks'

export class SaveAnimalRepoSpy implements SaveAnimalRepo {
  params!: SaveAnimalRepo.Params
  result: SaveAnimalRepo.Result = mockAnimalModel()

  async save (data: SaveAnimalRepo.Params): Promise<SaveAnimalRepo.Result> {
    this.params = data
    return this.result
  }
}
