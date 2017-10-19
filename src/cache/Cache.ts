/**
 * Cache module
 */

'use strict';

import {
  CACHE_STALE_DELTA,
  KEY_PARSED_FEED,
  KEY_TOP_PODCASTS,
} from './constants';
import {
  initCache,
  redis,
} from './index';

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
  return redis.set(key, stringify({
      entity: value,
      timestamp: Date.now(),
    }))
    .catch(console.error);
};

/**
 * Read from redis checks if stored key is stale or fresh
 */
const read = async <T>(key: string): Promise<T|null> => {
  try {
    const res = await redis.get(key);
    if (!res) {
      return null;
    }
    const cached = parse<T>(res);
    const { entity, timestamp } = cached;
    if (
      Date.now() - timestamp <= CACHE_STALE_DELTA // Cache is fresh
    ) {
      return entity;
    } else {
      return null; // Cache is stale
    }
  } catch (err) {
    console.error(err);
    return null;
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
  async top(count: number): Promise<App.Podcast[]> {
    try {
      const podcasts = await read<App.Podcast[]>(KEY_TOP_PODCASTS);
      if (podcasts && podcasts.length >= count) {
        return podcasts.slice(0, count);
      } else {
        return [];
      }
    } catch (err) {
      console.error(err);
      return [];
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
  async feed(url: string): Promise<App.EpisodeListing | null> {
    try {
      const feedData = await read<App.EpisodeListing>(feedKey(url));
      return feedData;
    } catch (err) {
      console.error(err);
      return null;
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
