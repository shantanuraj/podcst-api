/**
 * Data caching module
 */

'use strict';

import Cache from '../cache/Cache';

import { top as topApi } from '../podcasts';

const cache = new Cache();

/**
 * Top podcasts cache proxy
 */
const top: App.Top = async (count: number): Promise<App.Podcast[]> => {
  try {
    let podcasts = await cache.top(count);
    if (podcasts.length === 0) {
      podcasts = await topApi(count);
      cache.saveTop(podcasts);
    }
    return podcasts;
  } catch (err) {
    return [];
  }
};

export default top;
