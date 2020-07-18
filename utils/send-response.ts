import { Context } from 'koa';
import { CACHE_STALE_DELTA } from '../cache/constants';
import { headers } from './index';

function validCacheTimestamp(timestamp: number) {
  const expiryDate = timestamp + CACHE_STALE_DELTA;
  let ts = Math.trunc((expiryDate - Date.now()) / 1000);
  ts = Math.max(ts, 0);
  ts = Math.min(ts, CACHE_STALE_DELTA);
  return ts;
}

/**
 * Send reponse sets the relevant cache and populates the response body
 */
export const sendResponse = <T>(ctx: Context, data: App.CachedEntity<T>) => {
  headers.cache(ctx, validCacheTimestamp(data.timestamp));
  ctx.body = data.entity;
  return ctx;
}
