/**
 * Data caching module
 */

'use strict';

import Cache from '../cache/Cache';

import {
  search as searchApi,
  top as topApi,
} from '../podcast';

const cache = new Cache();

/**
 * Podcast search cache proxy
 */
export const search: App.Search = async (term: string): Promise<App.Podcast[]> => {
  return searchApi(term);
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