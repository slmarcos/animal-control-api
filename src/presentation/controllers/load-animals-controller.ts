import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helpers'
import { LoadAnimals } from '@/domain/use-cases'

export class LoadAnimalsController implements Controller {
  constructor (
    private readonly loadAnimals: LoadAnimals
  ) { }

  async handle (): Promise<LoadAnimalsController.Result> {
    try {
      const animals = await this.loadAnimals.load()
      return ok(animals)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadAnimalsController {
  export type Result = HttpResponse
}
