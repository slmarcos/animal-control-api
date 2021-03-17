import { adaptRoute } from '@/main/adapters'
import { makeLoadAnimalByIdController, makeSaveAnimalController } from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/animal', adaptRoute(makeSaveAnimalController()))
  router.put('/animal/:animalId', adaptRoute(makeSaveAnimalController()))
  router.get('/animal/:animalId', adaptRoute(makeLoadAnimalByIdController()))
}
