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
  categories: podcast.genreIds,
  count: podcast.trackCount,
  cover: podcast.artworkUrl600,
  explicit: podcast.collectionExplicitness,
  feed: podcast.feedUrl,
  thumbnail: podcast.artworkUrl100,
  title: podcast.collectionName,
  url: podcast.feedUrl,
});

/**
 * Adapt iTunes response
 */
export const adaptResponse = (res: iTunes.Response) => res.results.map(adaptPodcast);