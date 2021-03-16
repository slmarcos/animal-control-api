import { AnimalModel } from '@/domain/models'

export interface SaveAnimal {
  save: (data: SaveAnimal.Params) => Promise<SaveAnimal.Result>
}

export namespace SaveAnimal {
  export type Params = {
    name: string
    age: number
    weight: number
    type: string
  }

  export type Result = AnimalModel
}
