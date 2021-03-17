import { SaveAnimal } from '@/domain/use-cases'
import { mockAnimalModel } from '@/tests/domain/mocks'

export class SaveAnimalSpy implements SaveAnimal {
  params!: SaveAnimal.Params
  result: SaveAnimal.Result = mockAnimalModel()

  async save (data: SaveAnimal.Params): Promise<SaveAnimal.Result> {
    this.params = data
    return this.result
  }
}
