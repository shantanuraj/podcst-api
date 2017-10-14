/**
 * Utlity functions
 */

'use strict';

import { parse } from 'url';

/**
 * Convert feed response to search response
 */
export const convertFeedToSearchResponse = (feed: string) =>
  (res: App.EpisodeListing | null): App.PodcastSearchResult[] => (
    res ? [{
      feed,
      author: res.author,
      thumbnail: res.cover,
      title: res.title,
    }] : []
  );

/**
 * Extract base link from a url
 */
export const extractBaseLink = (url: string): string | null => {
  const parsed = parse(url);
  if (!parsed) {
    return null;
  }
  const { protocol, host } = parsed;
  return `${protocol}//${host}`;
};
