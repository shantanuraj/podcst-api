/**
 * Podcast Search API
 */

import axios from 'axios';
import { stringify } from 'querystring';

import {
  ITUNES_API,
} from './constants';

import {
  adaptResponse,
} from './adapter';

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
export const search = async (term: string): Promise<App.Podcast[]> => {
  try {
    const res = await fetcher.request({
      params: { term },
    });
    if (res.status !== 200) {
      console.error('Could not perform search:', term);
      return [];
    }
    return adaptResponse(res.data as iTunes.Response);
  } catch(err) {
    console.error(err);
    return [];
  }
};