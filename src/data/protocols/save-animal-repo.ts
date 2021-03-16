import { SaveAnimal } from '@/domain/use-cases'

export interface SaveAnimalRepo {
  save: (data: SaveAnimalRepo.Params) => Promise<SaveAnimalRepo.Result>
}

export namespace SaveAnimalRepo {
  export type Params = SaveAnimal.Params
  export type Result = SaveAnimal.Result
}
