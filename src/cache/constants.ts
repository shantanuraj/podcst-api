/**
 * Constants for cache module
 */

'use strict';

/**
 * Redis key for Top podcasts
 */
export const KEY_TOP_PODCASTS = 'top';

/**
 * Redis key for parsed Feed
 */
export const KEY_PARSED_FEED = 'feed';

/**
 * Time delta to determine if cache is stale
 */
export const CACHE_STALE_DELTA = 3600000; // 1 hour
