/**
 * Podcast adapter module
 */

'use strict';

/**
 * Adapt iTunes podcast to App podcast
 */
export const adaptPodcast = (podcast: iTunes.Podcast): App.Podcast => ({
  id: podcast.collectionId,
  author: podcast.artistName,
  categories: podcast.genreIds.map(c => parseInt(c, 10)),
  count: podcast.trackCount,
  cover: podcast.artworkUrl600,
  explicit: podcast.collectionExplicitness,
  feed: podcast.feedUrl || feedURLExceptions[podcast.collectionId],
  thumbnail: podcast.artworkUrl100,
  title: podcast.collectionName,
});

/**
 * Adapt iTunes response
 */
export const adaptResponse = (res: iTunes.Response) => res.results.map(adaptPodcast);

/**
 * Feed URL exceptions
 */
const feedURLExceptions = {
  1473872585: 'https://apple.news/podcast/apple_news_today',
};
