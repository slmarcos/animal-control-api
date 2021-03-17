export interface Controller<T = any, U = any> {
  handle: (request: T) => Promise<U>
}
