/**
 * Data caching module
 */

'use strict';

import Cache from '../cache/Cache';

import { top as topApi } from '../podcasts';
import { cacheMiss, isCached } from '../utils';

const cache = new Cache();

/**
 * Top podcasts cache proxy
 */
const top: App.Provider['top']['data'] = async (count) => {
  try {
    let data = await cache.top(count);
    if (isCached(data) && data.entity.length > 0) {
      return data;
    }
    let podcasts = await topApi(count);
    cache.saveTop(podcasts);
    return cacheMiss(podcasts);
  } catch (err) {
    return cacheMiss([]);
  }
};

export default top;
