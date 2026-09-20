import { eq } from 'drizzle-orm'
import z from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { InvalidShortUrl } from './errors/invalid-short-url'
import { ShortUrlAlreadyExists } from './errors/short-url-already-exists'

const linkInput = z.object({
  originalUrl: z.string(),
  shortUrl: z.string(),
})

type LinkInput = z.input<typeof linkInput>

export async function createLink(
  input: LinkInput
): Promise<Either<InvalidShortUrl | ShortUrlAlreadyExists, { id: string }>> {
  const { originalUrl, shortUrl } = linkInput.parse(input)

  const shortUrlPattern = /^[a-zA-Z0-9_-]+$/

  // Verifica se URL curta esta mal formatada
  if (!shortUrlPattern.test(shortUrl)) {
    return makeLeft(new InvalidShortUrl())
  }

  const [shortExists] = await db
    .select({
      id: schema.links.id,
    })
    .from(schema.links)
    .where(eq(schema.links.shortUrl, shortUrl))
    .limit(1)

  if (shortExists) {
    return makeLeft(new ShortUrlAlreadyExists())
  }

  const [link] = await db
    .insert(schema.links)
    .values({
      originalUrl: originalUrl,
      shortUrl: shortUrl,
    })
    .returning({
      id: schema.links.id,
    })

  return makeRight({ id: link.id })
}
