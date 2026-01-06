import 'dotenv/config'
import { defineConfig } from 'orval';

// const target = `${process.env.VITE_API_BASE_URL}/definitions`
const target = `http://localhost:4000/definitions`

console.log('ORVAL TARGET:', target)


export default defineConfig({
  api: {
    input: {
      target
    },
    output: {
      mode: 'tags-split',
      target: './src/services/endpoints',
      schemas: './src/services/models',
      client: 'react-query',
      mock: false,
      prettier: true,
      override: {
        mutator: {
          path: './src/services/client.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          useInfinite: true,
          useInfiniteQueryParam: 'page',
          options: {
            staleTime: 10000,
          },
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
});
