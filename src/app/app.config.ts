import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { withDevtools } from '@tanstack/angular-query-experimental/devtools/production';
import { provideMarkdown } from 'ngx-markdown';

const queryClient = new QueryClient();

// TypeScript only:
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/query-core').QueryClient;
  }
}

window.__TANSTACK_QUERY_CLIENT__ = queryClient;

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideTanStackQuery(
      queryClient,
      withDevtools(() => ({ loadDevtools: 'auto' })),
    ),
    provideMarkdown(),
  ],
};
