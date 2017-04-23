/**
 * Data caching module
 */

'use strict';

import {
  search as searchApi,
  top as topApi,
} from '../podcast';

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
  return topApi(count);
};