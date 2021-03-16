import { SaveAnimal } from '@/domain/use-cases'
import { SaveAnimalRepo } from '@/data/protocols'

export class DbSaveAnimal implements SaveAnimal {
  constructor (
    private readonly saveAnimalRepo: SaveAnimalRepo
  ) { }

  async save (data: SaveAnimal.Params): Promise<SaveAnimal.Result> {
    await this.saveAnimalRepo.save(data)
    return null as any
  }
}
