export class ShortUrlAlreadyExists extends Error {
  constructor() {
    super('Essa URL encurtada já existe')
  }
}
