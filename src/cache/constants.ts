/**
 * Constants for cache module
 */

'use strict';

/**
 * Redis key for Top podcasts
 */
export const KEY_TOP_PODCASTS = 'top';

/**
 * Time delta to determine if cache is stale
 */
export const CACHE_STALE_DELTA = 86400000; // 1 day