# Brevly

Aplicação para gerenciamento e encurtamento de URLs, desenvolvida como desafio do módulo **Fundamentos Técnicos e Estratégicos**, da pós-graduação da Rocketseat.

O projeto permite criar, consultar, acessar e excluir links encurtados, acompanhar a quantidade de acessos e exportar um relatório em CSV disponibilizado pelo Cloudflare R2.

## Tecnologias utilizadas

### Back-end
- Node.js e TypeScript
- Fastify
- Drizzle ORM
- PostgreSQL
- Zod
- Vitest
- Cloudflare R2
- Docker

### Front-end
- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- Axios
- Phosphor Icons

## Funcionalidades

- Criar links encurtados.
- Validar o formato da URL encurtada.
- Impedir o cadastro de URLs encurtadas duplicadas.
- Listar os links cadastrados.
- Excluir links.
- Redirecionar para a URL original.
- Contabilizar os acessos de cada link.
- Exportar os links em CSV.
- Disponibilizar o CSV por meio do Cloudflare R2.
- Exibir páginas de redirecionamento e recurso não encontrado.
- Exibir estados de carregamento e lista vazia.

## Estrutura do projeto

```text
brevly/
├── server/     # API, banco de dados e armazenamento
├── web/        # Aplicação React
└── README.md
```

## Pré-requisitos

Para executar o projeto localmente, é necessário ter instalado:

- Node.js
- pnpm
- Docker com Docker Compose

Também é necessário configurar um bucket no Cloudflare R2 para a funcionalidade de exportação.

## Configuração do back-end

Acesse a pasta do servidor:

```bash
cd server
```

Instale as dependências:

```bash
pnpm install
```

Crie o arquivo `.env` com base no `.env.example`:

```bash
cp .env.example .env
```

Configure as variáveis:

```env
PORT=3333
NODE_ENV=development

DATABASE_URL=

CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_ACCESS_KEY_ID=
CLOUDFLARE_SECRET_ACCESS_KEY=
CLOUDFLARE_BUCKET=
CLOUDFLARE_PUBLIC_URL=
```

Preencha a URL de conexão com o PostgreSQL e as credenciais do Cloudflare R2.

### Banco de dados

Inicie o PostgreSQL:

```bash
docker compose up -d
```

Execute as migrations:

```bash
pnpm run db:migrate
```

### Executando a API

Para desenvolvimento:

```bash
pnpm run dev
```

A API estará disponível, por padrão, em:

```text
http://localhost:3333
```

A documentação interativa pode ser acessada em:

```text
http://localhost:3333/docs
```

## Configuração do front-end

Em outro terminal, acesse a pasta:

```bash
cd web
```

Instale as dependências:

```bash
pnpm install
```

Crie o arquivo `.env` com base no `.env.example`:

```bash
cp .env.example .env
```

Configure as variáveis:

```env
VITE_FRONTEND_URL=http://localhost:5173
VITE_BACKEND_URL=http://localhost:3333
```

Inicie a aplicação:

```bash
pnpm run dev
```

Acesse:

```text
http://localhost:5173
```

## Testes automatizados

Os testes do back-end utilizam Vitest e um ambiente de banco de dados separado.

Na pasta `server`, configure o arquivo `.env.test` para utilizar um banco de testes e execute:

```bash
pnpm run test
```

Para executar os testes em modo de observação:

```bash
pnpm run test:watch
```

Os scripts executam previamente as migrations do ambiente de testes.

## Build

### Back-end

```bash
cd server
pnpm run build
```

### Front-end

```bash
cd web
pnpm run build
```

## Exportação CSV

A aplicação permite gerar um relatório dos links cadastrados contendo:

- Identificador do link.
- URL original.
- URL encurtada.
- Quantidade de acessos.
- Data de criação.

O arquivo é enviado ao Cloudflare R2 e disponibilizado por uma URL pública.

## Entrega

Projeto desenvolvido para a avaliação prática da pós-graduação Rocketseat, contemplando os desafios de Front-end, Back-end e DevOps.