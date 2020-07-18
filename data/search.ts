/**
 * Data caching module
 */

'use strict';

import { search as searchApi } from '../podcasts';

/**
 * Podcast search cache proxy
 */
const search: App.Provider['search']['data'] = searchApi;

export default search;
