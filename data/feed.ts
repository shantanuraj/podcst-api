/**
 * Data caching module
 */

'use strict';

import Cache from '../cache/Cache';

import { feed as feedApi } from '../podcasts';
import { cacheMiss, isCached } from '../utils';

const cache = new Cache();

/**
 * Podcast feed lookup
 */
const feed: App.Provider['feed']['data'] = async (url) => {
  try {
    const data = await cache.feed(url);
    if (isCached(data)) {
      return data;
    }
    const feedData = await feedApi(url);
    if (feedData) {
      cache.saveFeed(url, feedData);
    }
    return cacheMiss(feedData);
  } catch (err) {
    return cacheMiss(null);
  }
};

export default feed;
