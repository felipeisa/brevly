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
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params

      const result = await accessLink({
        shortUrl: shortUrl,
      })

      console.log(result)

      if (isLeft(result)) {
        const error = unwrapEither(result)
        return reply.status(404).send({ message: error.message })
      }

      const { originalUrl } = unwrapEither(result)

      return reply.status(200).send({ originalUrl })
    }
  )
}
