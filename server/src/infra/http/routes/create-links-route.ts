import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { createLink } from '@/app/functions/create-links'

export const createLinkRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/link',
    {
      schema: {
        summary: 'Create a new link',
        body: z.object({
          originalUrl: z.string().url(),
          shortUrl: z.string(),
        }),
        response: {
          201: z.object({ linkId: z.string() }),
          409: z
            .object({ message: z.string() })
            .describe('Link already exists'),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortUrl } = request.body

      const result = await createLink({
        originalUrl,
        shortUrl,
      })

      return reply.status(201).send({ linkId: 'teste' })
    }
  )
}
