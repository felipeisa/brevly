import z from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

const linkInput = z.object({
  originalUrl: z.string(),
  shortUrl: z.string(),
})

type LinkInput = z.input<typeof linkInput>

export async function createLink(input: LinkInput) {
  const { originalUrl, shortUrl } = linkInput.parse(input)

  await db.insert(schema.links).values({
    originalUrl: originalUrl,
    shortUrl: shortUrl,
  })
}
