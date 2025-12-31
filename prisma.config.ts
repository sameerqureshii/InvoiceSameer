import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: './prisma/schema.prisma',
  config: {
    database: {
      url: process.env.DATABASE_URL,
    },
  },
})