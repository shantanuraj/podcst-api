/**
 * Cache module
 */

'use strict';

import { CACHE_STALE_DELTA, KEY_PARSED_FEED, KEY_TOP_PODCASTS } from './constants';
import { initCache, redis } from './index';

import { cacheHit, cacheMiss } from '../utils';

/**
 * Redis key for feed
 */
const feedKey = (url: string) => `${KEY_PARSED_FEED}-${url.trim()}`;

/**
 * Parse stringified JSON to Object
 */
const parse = <T>(val: string) => JSON.parse(val) as App.CachedEntity<T>;

/**
 * Convert Object to JSON string
 */
const stringify = <T>(val: App.CachedEntity<T>) => JSON.stringify(val);

/**
 * Save key, value pair to redis
 */
const save = async <T>(key: string, value: T) => {
  return redis
    .set(
      key,
      stringify({
        entity: value,
        timestamp: Date.now(),
      }),
    )
    .catch(console.error);
};

/**
 * Read from redis checks if stored key is stale or fresh
 */
const read = async <T>(key: string): App.CacheResponse<T | null> => {
  try {
    const res = await redis.get(key);
    if (!res) {
      return cacheMiss(null);
    }
    const cached = parse<T>(res);
    const { timestamp } = cached;
    if (
      Date.now() - timestamp <=
      CACHE_STALE_DELTA // Cache is fresh
    ) {
      return cached;
    } else {
      return cacheMiss(null); // Cache is stale
    }
  } catch (err) {
    console.error(err);
    return cacheMiss(null);
  }
};

/**
 * Cache helper module
 */
class Cache implements App.Cache {
  constructor() {
    // Connect to redis if not already connected
    initCache();
  }
  /**
   * Get top podcasts from redis cache
   */
  async top(count: number) {
    try {
      let cached = await read<App.Podcast[]>(KEY_TOP_PODCASTS);
      if (cached.entity && cached.entity.length >= count) {
        cached.entity = cached.entity.slice(0, count);
        return cacheHit(cached);
      } else {
        return cacheMiss([]);
      }
    } catch (err) {
      console.error(err);
      return cacheMiss([]);
    }
  }
  /**
   * Set top podcasts in redis cache
   */
  async saveTop(podcasts: App.Podcast[]) {
    return save(KEY_TOP_PODCASTS, podcasts);
  }
  /**
   * Get parsed feed from redis cache
   */
  async feed(url: string) {
    try {
      const cached = await read<App.EpisodeListing>(feedKey(url));
      return cached;
    } catch (err) {
      console.error(err);
      return cacheMiss(null);
    }
  }
  /**
   * Set top podcasts in redis cache
   */
  async saveFeed(url: string, feed: App.EpisodeListing) {
    return save(feedKey(url), feed);
  }
}

export default Cache;
