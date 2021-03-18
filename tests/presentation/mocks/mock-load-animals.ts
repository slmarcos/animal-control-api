import { LoadAnimals } from '@/domain/use-cases'
import { mockAnimalModel } from '@/tests/domain/mocks'

export class LoadAnimalsSpy implements LoadAnimals {
  calls = 0
  result: LoadAnimals.Result = [
    mockAnimalModel(),
    mockAnimalModel()
  ]

  async load (): Promise<LoadAnimals.Result> {
    this.calls++
    return this.result
  }
}
