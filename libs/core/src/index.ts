/*** project services start ***/
// these services will be common for all clients , will include api logic, storage, handling etc
export * from './lib/services/api/api.service';
export * from './lib/services/api/api-loading.service';
export * from './lib/services/api/api-watcher.service';
export * from './lib/services/error/error.service';
export * from './lib/services/generic-fetcher/generic-fetcher.service';
export * from './lib/services/global/global.service';
export * from './lib/services/redirection/redirection.service';
export * from './lib/services/router-state/router-state.service';
export * from './lib/services/storage/cookie-storage.service';
export * from './lib/services/storage/local-storage.service';

/*** project services end ***/