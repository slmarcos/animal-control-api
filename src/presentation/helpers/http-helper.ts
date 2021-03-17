import { HttpResponse } from '@/presentation/protocols'
import { ServerError } from '@/presentation/errors'

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  error: error
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  error: new ServerError(error.stack)
})
