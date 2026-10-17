import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  timeout: 60000,
  use: {
    baseURL: 'http://127.0.0.1:3100',
    browserName: 'chromium',
    channel: process.env.PLAYWRIGHT_CHANNEL,
    trace: 'retain-on-failure',
  },
  reporter: [['list'], ['html', { open: 'never' }]],
  webServer: [
    {
      command: 'node ../backend/node_modules/tsx/dist/cli.mjs ../backend/tests/serve.ts',
      url: 'http://127.0.0.1:5100/api/v1/health',
      env: { NODE_ENV: 'test' },
      timeout: 120000,
      reuseExistingServer: false,
    },
    {
      command:
        'node node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 3100',
      url: 'http://127.0.0.1:3100',
      env: {
        NEXT_DIST_DIR: '.next-e2e',
        INQUIRY_API_BASE_URL: 'http://127.0.0.1:5100/api/v1',
        NEXT_PUBLIC_SITE_URL: 'http://127.0.0.1:3100',
      },
      timeout: 120000,
      reuseExistingServer: false,
    },
  ],
});
