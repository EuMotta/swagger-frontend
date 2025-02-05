import { defineConfig } from 'orval';

export default defineConfig({
  client: {
    input: {
      target: 'http://localhost:3001/api-json',
    },
    output: {
      mode: 'split',
      target: './src/http/generated/api.ts',
      client: 'react-query',
      httpClient: 'axios',
      clean: true,
      override: {
        header: () =>
          `/* eslint-disable */\n/* tslint:disable */\n// @ts-nocheck\n\n`,
        fetch: {
          includeHttpResponseReturnType: false,
        },
        mutator: {
          path: './src/http/client.ts',
          name: 'http',
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'npm run format:api',
    },
  },
  clientZod: {
    input: {
      target: 'http://localhost:3001/api-json',
    },
    output: {
      mode: 'tags-split',
      client: 'zod',
      target: './src/http/generated/schemas',
      fileExtension: '.zod.ts',
      override: {
        zod: {
          generate: {
            param: true,
            query: true,
            header: true,
            body: true,
            response: false,
          },
          generateEachHttpStatus: true,
        },
      },
    },
  },
});
