import { Controller, HttpResponse, Validator } from '@/presentation/protocols'
import { badRequest, noContent, ok, serverError } from '@/presentation/helpers'
import { LoadAnimalById, SaveAnimal } from '@/domain/use-cases'

export class UpdateAnimalController implements Controller {
  constructor (
    private readonly validator: Validator,
    private readonly loadAnimalById: LoadAnimalById,
    private readonly saveAnimal: SaveAnimal
  ) { }

  async handle (request: UpdateAnimalController.Request): Promise<UpdateAnimalController.Result> {
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

export namespace UpdateAnimalController {
  export type Request = {
    animalId: string
    name: string
    age: number
    weight: number
    type: string
  }

  export type Result = HttpResponse
}
