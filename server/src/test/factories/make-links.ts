import { fakerPT_BR as faker } from '@faker-js/faker'
import type { InferInsertModel } from 'drizzle-orm'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

export async function makeLink(
  overrides?: Partial<InferInsertModel<typeof schema.links>>
) {
  const word = faker.internet.domainWord()
  const number = faker.number.int({ min: 1000, max: 9999 })

  const result = await db
    .insert(schema.links)
    .values({
      originalUrl: faker.internet.url(),
      shortUrl: `${word}-${number}`,
      ...overrides,
    })
    .returning()

  return result[0]
}
