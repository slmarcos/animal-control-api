import { adaptRoute } from '@/main/adapters'
import { makeLoadAnimalByIdController, makeCreateAnimalController, makeUpdateAnimalController } from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/animal', adaptRoute(makeCreateAnimalController()))
  router.put('/animal/:animalId', adaptRoute(makeUpdateAnimalController()))
  router.get('/animal/:animalId', adaptRoute(makeLoadAnimalByIdController()))
}
