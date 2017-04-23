/**
 * Cache module
 */

'use strict';

import {
  KEY_TOP_PODCASTS
} from './constants';
import {
  initCache,
  redis,
} from './index';

/**
 * Parse stringified JSON to Object
 */
const parse = <T>(val: string) => JSON.parse(val) as T;
/**
 * Conver Object to JSON string
 */
const stringify = <T>(val: T) => JSON.stringify(val);

/**
 * Save to redis
 */
const save = async <T>(key: string, value: T) => {
  return redis.set(key, stringify(value))
    .catch(console.error);
}

/**
 * Read from redis
 */
const read = async <T>(key: string): Promise<T|null> => {
  return redis.get(key)
    .then(parse)
    .catch(console.error);
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
        return podcasts.slice(count);
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  /**
   * Set top podcasts in redis cache
   */
  async saveTop(podcasts: App.Podcast[]) {
    return save(KEY_TOP_PODCASTS, podcasts);
  }
}

export default Cache;