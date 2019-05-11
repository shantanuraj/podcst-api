/**
 * Podcast Search API
 */

import axios from 'axios';

import { ITUNES_API } from './constants';

import { adaptResponse } from './adapter';

const fetcher = axios.create({
  baseURL: ITUNES_API + '/search',
  params: {
    country: 'US',
    media: 'podcast',
  },
});

/**
 * Returns list of podcasts from search
 */
const search: App.Search = async (term: string): Promise<App.PodcastSearchResult[]> => {
  try {
    const res = await fetcher.request({
      params: { term },
    });
    if (res.status !== 200) {
      console.error('Could not perform search:', term);
      return [];
    }
    return adaptResponse(res.data as iTunes.Response);
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default search;
