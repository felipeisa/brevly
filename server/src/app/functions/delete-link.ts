import { eq } from 'drizzle-orm'
import z from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { LinkNotFound } from './errors/link-not-found'

const deleteLinkInput = z.object({
  shortUrl: z.string(),
})

type DeleteLinkInput = z.input<typeof deleteLinkInput>

type DeleteLinkOutput = {
  shortUrl: string
}

export async function deleteLink(
  input: DeleteLinkInput
): Promise<Either<LinkNotFound, DeleteLinkOutput>> {
  const { shortUrl } = deleteLinkInput.parse(input)

  const [link] = await db
    .delete(schema.links)
    .where(eq(schema.links.shortUrl, shortUrl))
    .returning({ shortUrl: schema.links.shortUrl })

  if (!link) {
    return makeLeft(new LinkNotFound())
  }

  return makeRight(link)
}
