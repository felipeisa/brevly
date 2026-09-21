import { randomUUID } from 'node:crypto'
import { eq } from 'drizzle-orm'
import { describe, expect, it } from 'vitest'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isLeft, isRight, unwrapEither } from '@/shared/either'
import { createLink } from './create-links'
import { InvalidShortUrl } from './errors/invalid-short-url'
import { ShortUrlAlreadyExists } from './errors/short-url-already-exists'

describe('create link', () => {
  it('deve ser possível inserir um link', async () => {
    const shortUrl = `${randomUUID()}`
    console.log(shortUrl)

    const sut = await createLink({
      originalUrl: 'google.com.br',
      shortUrl: shortUrl,
    })

    expect(isRight(sut)).toBe(true)

    const result = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.shortUrl, shortUrl))

    expect(result).toHaveLength(1)
  })

  it('nao deve ser possível inserir url curta com formato invalido', async () => {
    const shortUrl = 'teste #'

    const sut = await createLink({
      originalUrl: 'google.com.br',
      shortUrl: shortUrl,
    })

    expect(isLeft(sut)).toBe(true)
    expect(unwrapEither(sut)).toBeInstanceOf(InvalidShortUrl)
  })

  it('nao deve ser possível inserir url curta duplicada', async () => {
    const [shortUrlExists] = await db
      .select({ shortUrl: schema.links.shortUrl })
      .from(schema.links)
      .limit(1)
      .toString()

    console.log(shortUrlExists)

    const sut = await createLink({
      originalUrl: 'google.com.br',
      shortUrl: shortUrlExists,
    })

    expect(isLeft(sut)).toBe(true)
    expect(unwrapEither(sut)).toBeInstanceOf(ShortUrlAlreadyExists)
  })
})
