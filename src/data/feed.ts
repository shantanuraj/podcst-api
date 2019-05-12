/**
 * Data caching module
 */

'use strict';

import Cache from '../cache/Cache';

import { feed as feedApi } from '../podcasts';
import { cacheMiss } from '../utils';

const cache = new Cache();

/**
 * Podcast feed lookup
 */
const feed: App.Provider['feed']['data'] = async (url) => {
  try {
    const cached = await cache.feed(url);
    if (cached) {
      return cached;
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
