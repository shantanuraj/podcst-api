/**
 * Podcast Search API
 */

import axios from 'axios';
import { stringify } from 'querystring';

import {
  ITUNES_API,
} from './constants';

const getUrl = (limit: number) => `${ITUNES_API}/us/rss/toppodcasts/limit=${limit}/explicit=true/json`;

export const top = async (count: number): Promise<any> => {
  try {
    const url = getUrl(count);
    const res = await axios.get(url);
    if (res.status !== 200) {
      return { results: [] };
    }
    return res.data as iTunes.Response;
  } catch(err) {
    console.error(err);
    return { results: [] };
  }
};