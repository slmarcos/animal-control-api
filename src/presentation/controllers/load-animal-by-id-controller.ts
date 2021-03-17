import { Controller, HttpResponse, Validator } from '@/presentation/protocols'
import { badRequest, noContent, ok, serverError } from '@/presentation/helpers'
import { LoadAnimalById } from '@/domain/use-cases'

export class LoadAnimalByIdController implements Controller {
  constructor (
    private readonly validator: Validator,
    private readonly loadAnimalById: LoadAnimalById
  ) { }

  async handle (request: LoadAnimalByIdController.Request): Promise<LoadAnimalByIdController.Result> {
    try {
      const error = this.validator.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { animalId } = request
      const animal = await this.loadAnimalById.load(animalId)
      if (!animal) {
        return noContent()
      }
      return ok(animal)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadAnimalByIdController {
  export type Request = {
    animalId: string
  }

  export type Result = HttpResponse
}
