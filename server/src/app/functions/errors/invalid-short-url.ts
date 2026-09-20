export class InvalidShortUrl extends Error {
  constructor() {
    super('Formato de URL curta invalido')
  }
}
