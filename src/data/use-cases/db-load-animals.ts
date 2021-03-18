import { LoadAnimals } from '@/domain/use-cases'
import { LoadAnimalsRepo } from '@/data/protocols'

export class DbLoadAnimals implements LoadAnimals {
  constructor (
    private readonly loadAnimalsRepo: LoadAnimalsRepo
  ) { }

  async load (): Promise<LoadAnimals.Result> {
    return this.loadAnimalsRepo.load()
  }
}
