import { faker } from '@faker-js/faker'
import { eq } from 'drizzle-orm'
import { describe, expect, it } from 'vitest'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isLeft, isRight, unwrapEither } from '@/shared/either'
import { makeLink } from '@/test/factories/make-links'
import { accessLink } from './access-link'
import { LinkNotFound } from './errors/link-not-found'

describe('access link', () => {
  it('deve ser possível acessar o link', async () => {
    const originalUrl = faker.internet.url()

    const link = await makeLink({ originalUrl: originalUrl })

    const sut = await accessLink({
      shortUrl: link.shortUrl,
    })

    expect(isRight(sut)).toBe(true)

    if (isRight(sut)) {
      expect(unwrapEither(sut).originalUrl).toEqual(originalUrl)
    }

    // testando incremento com segundo acesso
    const sut2 = await accessLink({
      shortUrl: link.shortUrl,
    })

    expect(isRight(sut2)).toBe(true)

    const [{ accessCount }] = await db
      .select({
        accessCount: schema.links.accessCount,
      })
      .from(schema.links)
      .where(eq(schema.links.shortUrl, link.shortUrl))

    expect(accessCount).toBe(2)
  })

  it('nao deve ser possivel acessar um link', async () => {
    const word = faker.internet.domainWord()
    const number = faker.number.int({ min: 1000, max: 9999 })

    const sut = await accessLink({
      shortUrl: `${word}-${number}`,
    })

    expect(isLeft(sut)).toBe(true)
    expect(unwrapEither(sut)).toBeInstanceOf(LinkNotFound)
  })
})
