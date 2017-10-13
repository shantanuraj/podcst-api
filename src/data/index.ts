/**
 * Data caching module
 */

'use strict';

import Cache from '../cache/Cache';

import {
  feed as feedApi,
  search as searchApi,
  top as topApi,
} from '../podcast';

const cache = new Cache();

/**
 * Podcast search cache proxy
 */
export const search: App.Search = async (term: string): Promise<App.PodcastSearchResult[]> => {
  return searchApi(term);
};

/**
 * Podcast feed lookup
 */
export const feed: App.FeedLookup = async (url: string): Promise<App.EpisodeListing | null> => {
  try {
    let feedData = await cache.feed(url);
    if (!feedData) {
      feedData = await feedApi(url);
      if (feedData) {
        cache.saveFeed(url, feedData);
      }
    }
    return feedData;
  } catch(err) {
    return null;
  }
};

/**
 * Top podcasts cache proxy
 */
export const top: App.Top = async (count: number): Promise<App.Podcast[]> => {
  try {
    let podcasts = await cache.top(count);
    if (podcasts.length === 0) {
      podcasts = await topApi(count);
      cache.saveTop(podcasts);
    }
    return podcasts;
  } catch(err) {
    return [];
  }
};
