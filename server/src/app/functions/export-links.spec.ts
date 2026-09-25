import { randomUUID } from 'node:crypto'
import { faker } from '@faker-js/faker'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { string } from 'zod'
import * as upload from '@/infra/storage/upload-file-to-storage'
import { isRight, unwrapEither } from '@/shared/either'
import { makeLink } from '@/test/factories/make-links'
import { exportLinks } from './export-links'

describe('export links', () => {
  // // Moka
  // beforeAll(() => {
  //   vi.mock('@/infra/storage/upload-file-to-storage.ts', () => {
  //     return {
  //       uploadFileToStorage: vi.fn().mockImplementation(() => {
  //         return {
  //           key: `${randomUUID()}.csv`,
  //           url: 'https://storage.com/file.csv'
  //         }
  //       })
  //     }
  //   })
  // })
  it('deve ser possível exportar os links', async () => {
    const uploadStub = vi
      .spyOn(upload, 'uploadFileToStorage')
      .mockImplementation(async () => {
        return {
          key: `${randomUUID()}.csv`,
          url: 'https://storage.com/file.csv',
        }
      })

    const originalUrlPattern = faker.internet.url()

    const link1 = await makeLink({ originalUrl: originalUrlPattern })
    const link2 = await makeLink({ originalUrl: originalUrlPattern })
    const link3 = await makeLink({ originalUrl: originalUrlPattern })
    const link4 = await makeLink({ originalUrl: originalUrlPattern })
    const link5 = await makeLink({ originalUrl: originalUrlPattern })

    const sut = await exportLinks({
      searchQuery: originalUrlPattern,
    })

    const generatedCSVStream = uploadStub.mock.calls[0][0].contentStream

    const csvAsString = await new Promise<string>((resolve, reject) => {
      const chunks: Buffer[] = []

      generatedCSVStream.on('data', chunk => {
        chunks.push(chunk)
      })

      generatedCSVStream.on('end', () => {
        resolve(Buffer.concat(chunks).toString('utf-8'))
      })
      generatedCSVStream.on('error', err => {
        reject(err)
      })
    })

    const csvAsArray = csvAsString
      .trim()
      .split('\n')
      .map(row => row.split(','))

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut)).toEqual({
      reportUrl: 'https://storage.com/file.csv',
    })

    expect(csvAsArray).toEqual([
      ['id', 'Original URL', 'Short URL', 'Access Count', 'Created At'],
      [
        link1.id,
        link1.originalUrl,
        link1.shortUrl,
        link1.accessCount.toString(),
        expect.any(String),
      ],
      [
        link2.id,
        link2.originalUrl,
        link2.shortUrl,
        link2.accessCount.toString(),
        expect.any(String),
      ],
      [
        link3.id,
        link3.originalUrl,
        link3.shortUrl,
        link3.accessCount.toString(),
        expect.any(String),
      ],
      [
        link4.id,
        link4.originalUrl,
        link4.shortUrl,
        link4.accessCount.toString(),
        expect.any(String),
      ],
      [
        link5.id,
        link5.originalUrl,
        link5.shortUrl,
        link5.accessCount.toString(),
        expect.any(String),
      ],
    ])
  })
})
