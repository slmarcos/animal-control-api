import { Controller, HttpResponse, Validator } from '@/presentation/protocols'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { SaveAnimal } from '@/domain/use-cases'

export class SaveAnimalController implements Controller {
  constructor (
    private readonly validator: Validator,
    private readonly saveAnimal: SaveAnimal
  ) { }

  async handle (request: SaveAnimalController.Request): Promise<SaveAnimalController.Result> {
    try {
      const error = this.validator.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { animalId: id, ...params } = request
      const animal = await this.saveAnimal.save({
        id,
        ...params
      })
      return ok(animal)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SaveAnimalController {
  export type Request = {
    animalId?: string
    name: string
    age: number
    weight: number
    type: string
  }

  export type Result = HttpResponse
}
