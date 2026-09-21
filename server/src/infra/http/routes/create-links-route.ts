import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { createLink } from '@/app/functions/create-links'
import { isRight, unwrapEither } from '@/shared/either'

export const createLinkRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/link',
    {
      schema: {
        summary: 'Criar um novo link',
        body: z.object({
          originalUrl: z.string().url(),
          shortUrl: z.string(),
        }),
        response: {
          201: z.object({ id: z.string() }),
          400: z.object({ message: z.string() }),
          409: z.object({ message: z.string() }).describe('O link ja existe'),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortUrl } = request.body

      const result = await createLink({
        originalUrl,
        shortUrl,
      })

      if (isRight(result)) {
        console.log(unwrapEither(result))
        const { id } = unwrapEither(result)
        return reply.status(201).send({
          id: id,
        })
      }

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case 'InvalidShortUrl':
          return reply.status(400).send({ message: error.message })
        case 'ShortUrlAlreadyExists':
          return reply.status(409).send({ message: error.message })
      }
    }
  )
}
