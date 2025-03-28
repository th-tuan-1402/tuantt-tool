import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '~': '/',
    },
  },
  test: {
    globals: true
  }
});
