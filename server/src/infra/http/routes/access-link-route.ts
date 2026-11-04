import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { accessLink } from '@/app/functions/access-link'
import { isLeft, unwrapEither } from '@/shared/either'

export const accessLinkRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/link/:shortUrl',
    {
      schema: {
        summary: 'Acessa link',
        tags: ['links'],
        params: z.object({
          shortUrl: z.string(),
        }),
        response: {
          200: z.object({
            originalUrl: z.string(),
          }),
          204: z.void(),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params

      const secPurpose = request.headers['sec-purpose']
      const purpose = request.headers.purpose

      const isPrefetch =
        secPurpose?.includes('prefetch') ||
        secPurpose?.includes('prerender') ||
        purpose === 'prefetch'

      if (isPrefetch) {
        return reply.status(204).send()
      }

      console.log({
        date: new Date().toISOString(),
        method: request.method,
        url: request.url,
        userAgent: request.headers['user-agent'],
        purpose: request.headers['purpose'],
        secPurpose: request.headers['sec-purpose'],
        referer: request.headers.referer,
      })

      const result = await accessLink({
        shortUrl: shortUrl,
      })

      if (isLeft(result)) {
        const error = unwrapEither(result)
        return reply.status(404).send({ message: error.message })
      }

      const { originalUrl } = unwrapEither(result)

      return reply.status(200).send({ originalUrl })
    }
  )
}
