import { faker } from '@faker-js/faker'
import { eq } from 'drizzle-orm'
import { describe, expect, it } from 'vitest'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isLeft, isRight, unwrapEither } from '@/shared/either'
import { makeLink } from '@/test/factories/make-links'
import { deleteLink } from './delete-link'
import { LinkNotFound } from './errors/link-not-found'

describe('delete link', () => {
  it('deve ser possível deletar o link', async () => {
    const originalUrl = faker.internet.url()

    const link = await makeLink({ originalUrl: originalUrl })

    const sut = await deleteLink({
      shortUrl: link.shortUrl,
    })

    expect(isRight(sut)).toBe(true)

    if (isRight(sut)) {
      expect(unwrapEither(sut).shortUrl).toEqual(link.shortUrl)
    }

    const [deletedLink] = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.shortUrl, link.shortUrl))

    expect(deletedLink).toBeUndefined()
  })

  it('nao deve ser possivel deletar um link inexistente', async () => {
    const word = faker.internet.domainWord()
    const number = faker.number.int({ min: 1000, max: 9999 })

    const sut = await deleteLink({
      shortUrl: `${word}-${number}`,
    })

    expect(isLeft(sut)).toBe(true)
    expect(unwrapEither(sut)).toBeInstanceOf(LinkNotFound)
  })
})
