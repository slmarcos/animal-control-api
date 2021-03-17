import { Controller, HttpResponse, Validator } from '@/presentation/protocols'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { SaveAnimal } from '@/domain/use-cases'

export class CreateAnimalController implements Controller {
  constructor (
    private readonly validator: Validator,
    private readonly saveAnimal: SaveAnimal
  ) { }

  async handle (request: CreateAnimalController.Request): Promise<CreateAnimalController.Result> {
    try {
      const error = this.validator.validate(request)
      if (error) {
        return badRequest(error)
      }
      const result = await this.saveAnimal.save(request)
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CreateAnimalController {
  export type Request = {
    name: string
    age: number
    weight: number
    type: string
  }

  export type Result = HttpResponse
}
