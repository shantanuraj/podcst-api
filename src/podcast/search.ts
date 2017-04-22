/**
 * Podcast Search API
 */

import axios from 'axios';
import { stringify } from 'querystring';

import {
  ITUNES_API,
} from './constants';

const searcher = axios.create({
  baseURL: ITUNES_API + '/search',
  params: {
    country: 'US',
    media: 'podcast',
  },
});

export const search = async (term: string): Promise<iTunes.Response> => {
  try {
    const res = await searcher.request({
      params: { term },
    });
    if (res.status !== 200) {
      console.error('Could not perform search:', term);
      return { results: [] };
    }
    return res.data as iTunes.Response;
  } catch(err) {
    console.error(err);
    return { results: [] };
  }
};