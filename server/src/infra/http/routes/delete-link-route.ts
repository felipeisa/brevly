import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { deleteLink } from '@/app/functions/delete-link'
import { isLeft, unwrapEither } from '@/shared/either'

export const deleteLinkRoute: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/link/:shortUrl',
    {
      schema: {
        summary: 'Deleta link',
        tags: ['links'],
        params: z.object({
          shortUrl: z.string(),
        }),
        response: {
          204: z.null(),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params

      const result = await deleteLink({
        shortUrl: shortUrl,
      })

      if (isLeft(result)) {
        const error = unwrapEither(result)
        return reply.status(404).send({ message: error.message })
      }

      return reply.status(204).send(null)
    }
  )
}
