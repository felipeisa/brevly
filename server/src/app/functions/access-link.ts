import { eq, sql } from 'drizzle-orm'
import z from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { LinkNotFound } from './errors/link-not-found'

const accessLinkInput = z.object({
  shortUrl: z.string(),
})

type AccessLinkInput = z.input<typeof accessLinkInput>

type AccessLinkOutput = {
  originalUrl: string
}

export async function accessLink(
  input: AccessLinkInput
): Promise<Either<LinkNotFound, AccessLinkOutput>> {
  const { shortUrl } = accessLinkInput.parse(input)

  const [link] = await db
    .update(schema.links)
    .set({
      accessCount: sql`${schema.links.accessCount} + 1`,
    })
    .where(eq(schema.links.shortUrl, shortUrl))
    .returning({ originalUrl: schema.links.originalUrl })

  if (!link) {
    return makeLeft(new LinkNotFound())
  }

  return makeRight(link)
}
