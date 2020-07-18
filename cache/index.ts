/**
 * Cache module
 */

'use strict';

import * as Redis from 'ioredis';
import { Redis as IRedis } from 'ioredis';

/**
 * Redis connection singleton
 */
export let redis: IRedis;

/**
 * Call once in project, to initiate redis
 * connection
 */
export const initCache = () => {
  if (!redis) {
    redis = new Redis(process.env.PODCST_CACHE_ADDR);
  }
};
