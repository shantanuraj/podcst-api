/**
 * Data caching module
 */

'use strict';

import Cache from '../cache/Cache';

import { feed as feedApi } from '../podcasts';

const cache = new Cache();

/**
 * Podcast feed lookup
 */
const feed: App.FeedLookup = async (url: string): Promise<App.EpisodeListing | null> => {
  try {
    let feedData = await cache.feed(url);
    if (!feedData) {
      feedData = await feedApi(url);
      if (feedData) {
        cache.saveFeed(url, feedData);
      }
    }
    return feedData;
  } catch (err) {
    return null;
  }
};

export default feed;
