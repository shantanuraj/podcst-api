/**
 * Utlity functions
 */

'use strict';

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
