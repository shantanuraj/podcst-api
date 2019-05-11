/**
 * Data caching module
 */

'use strict';

import { search as searchApi } from '../podcasts';

/**
 * Podcast search cache proxy
 */
const search: App.Search = async (term: string): Promise<App.PodcastSearchResult[]> =>
  searchApi(term);

export default search;
