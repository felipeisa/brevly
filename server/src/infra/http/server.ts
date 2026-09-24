import { fastifyCors } from '@fastify/cors'
import fastifyMultipart from '@fastify/multipart'
import fastifySwagger from '@fastify/swagger'
import scalarUI from '@scalar/fastify-api-reference'
import { fastify } from 'fastify'
import {
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createLinkRoute } from './routes/create-link-route'
import { getLinksRoute } from './routes/get-links'

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

  console.error(error)

  return reply.status(500).send({ message: 'Erro do servidor interno' })
})

server.register(fastifyCors, { origin: '*' })

server.register(fastifyMultipart)
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'brevly server',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

// Rotas
server.register(createLinkRoute)
server.register(getLinksRoute)

server.get('/openapi.json', () => server.swagger())

server.register(scalarUI, {
  routePrefix: '/docs',
  configuration: {
    layout: 'modern',
  },
})

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP Server Executando')
})
