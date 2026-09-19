import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createLinkRoute } from './routes/create-link'

const server = fastify()

// Validacao e Serializacao
server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

// Error handler Global
server.setErrorHandler((error, request, reply) => {
  // identifica se e um erro de validacao
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.validation,
    })
  }

  // Envia o erro p/ alguma ferramenta de observabilidade (Sentry/Datadog/Grafana/Otel)

  console.error(error)

  return reply.status(500).send({ message: 'Erro do servidor interno' })
})

server.register(fastifyCors, { origin: '*' })

server.register(createLinkRoute)

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP Server Executando')
})
