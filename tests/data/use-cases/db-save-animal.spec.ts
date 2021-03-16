import { DbSaveAnimal } from '@/data/use-cases'
import { SaveAnimal } from '@/domain/use-cases'
import { SaveAnimalRepoSpy } from '@/tests/data/mocks'
import { mockSaveAnimalParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbSaveAnimal
  saveAnimalRepoSpy: SaveAnimalRepoSpy
}

const makeSut = (): SutTypes => {
  const saveAnimalRepoSpy = new SaveAnimalRepoSpy()
  const sut = new DbSaveAnimal(saveAnimalRepoSpy)
  return {
    sut,
    saveAnimalRepoSpy
  }
}

let saveAnimalParams: SaveAnimal.Params

describe('DbSaveAnimal use case', () => {
  beforeEach(() => {
    saveAnimalParams = mockSaveAnimalParams()
  })

  test('Should calls SaveAnimalRepo with correct params', async () => {
    const { sut, saveAnimalRepoSpy } = makeSut()
    await sut.save(saveAnimalParams)
    expect(saveAnimalRepoSpy.params).toEqual(saveAnimalParams)
  })
})
