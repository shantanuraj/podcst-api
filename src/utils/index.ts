/**
 * Podcast parsing utilities
 */

'use strict';

import { Context } from 'koa';
import { parse } from 'url';

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

/**
 * Style attribute regex
 */
const STYLE_ATTR_REGEX = /style="[^\"]*"/g;

/**
 * Reformat show notes to strip out custom styles
 */
export const reformatShowNotes = (notes: string) => {
  const reformattedNotes = notes.replace(STYLE_ATTR_REGEX, '');

  return reformattedNotes;
};

/**
 * Show notes count comparator
 */
export const showNotesSorter = (a: string, b: string) => a.length - b.length;

/**
 * Convert feed response to search response
 */
export const feedToSearchResponse = (feed: string) => (
  { entity: res }: App.CachedEntity<App.EpisodeListing | null>,
): App.PodcastSearchResult[] =>
  res
    ? [
        {
          feed,
          author: res.author,
          thumbnail: res.cover,
          title: res.title,
        },
      ]
    : [];

/**
 * Url check regex
 */
const URL_REGEX = /^https?\:\//;

/**
 * Returns true if given string is url-like
 */
export const isURL = (str: string) => URL_REGEX.test(str);

/**
 * Cache miss helper
 */
export const cacheMiss = <T>(entity: T) => ({ entity, timestamp: 0 });

/**
 * Cache hit helper (removes nullability from return type)
 */
export const cacheHit = <T>(entry: App.CachedEntity<T | null>) => entry as App.CachedEntity<T>;

/**
 * Returns true if given object is a cache hit
 */
export const isCached = <T>(entry: App.CachedEntity<T>) => entry.timestamp !== 0;

/**
 * Headers utlities
 */
export const headers = {
  cache: (ctx: Context, expiry: number) => {
    ctx.set('Cache-Control', `s-maxage=${expiry}, max-age=0`);
  },
};
