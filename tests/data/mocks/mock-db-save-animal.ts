import { SaveAnimalRepo } from '@/data/protocols'
import { SaveAnimal } from '@/domain/use-cases'
import { mockAnimalModel } from '@/tests/domain/mocks'

export class SaveAnimalRepoSpy implements SaveAnimalRepo {
  params!: SaveAnimalRepo.Params
  result: SaveAnimalRepo.Result = mockAnimalModel()

  async save (data: SaveAnimal.Params): Promise<SaveAnimalRepo.Result> {
    this.params = data
    return this.result
  }
}
