import { faker } from '@faker-js/faker'
import { describe, it } from 'vitest'
import { makeLink } from '@/test/factories/make-links'
import { exportLinks } from './export-links'

describe('export links', () => {
  it('deve ser possível exportar os links', async () => {
    const originalUrlPattern = faker.internet.url()

    const link1 = await makeLink({ originalUrl: originalUrlPattern })
    const link2 = await makeLink({ originalUrl: originalUrlPattern })
    const link3 = await makeLink({ originalUrl: originalUrlPattern })
    const link4 = await makeLink({ originalUrl: originalUrlPattern })
    const link5 = await makeLink({ originalUrl: originalUrlPattern })

    const sut = await exportLinks({
      searchQuery: originalUrlPattern,
    })
  })
})
