import { Controller, HttpResponse, Validator } from '@/presentation/protocols'
import { badRequest, noContent, ok, serverError } from '@/presentation/helpers'
import { LoadAnimalById, SaveAnimal } from '@/domain/use-cases'

export class SaveAnimalController implements Controller {
  constructor (
    private readonly validator: Validator,
    private readonly loadAnimalById: LoadAnimalById,
    private readonly saveAnimal: SaveAnimal
  ) { }

  async handle (request: SaveAnimalController.Request): Promise<SaveAnimalController.Result> {
    try {
      const error = this.validator.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { animalId, ...params } = request
      if (animalId) {
        const animal = await this.loadAnimalById.load(animalId)
        if (!animal) {
          return noContent()
        }
      }
      const result = await this.saveAnimal.save({
        id: animalId,
        ...params
      })
      return ok(result)
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
