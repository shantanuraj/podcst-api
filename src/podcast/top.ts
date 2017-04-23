/**
 * Podcast Search API
 */

import axios from 'axios';
import { stringify } from 'querystring';

import {
  ITUNES_API,
} from './constants';

/**
 * Generate url for RSS feed mapped to JSON, for the given limit
 */
const getUrl = (limit: number) => `${ITUNES_API}/us/rss/toppodcasts/limit=${limit}/explicit=true/json`;

/**
 * Url for directory lookup based on id/s
 */
const getLookupUrl = (ids: string[]) => `${ITUNES_API}/lookup?id=${ids.join(',')}`;

/**
 * Get adapted list of podcasts from iTunes API
 */
const lookup = async (ids: string[]): Promise<iTunes.Response> => {
  try {
    const url = getLookupUrl(ids);
    const res = await axios.get(url);
    if (res.status !== 200) {
      return { results: [] };
    }
    return res.data as iTunes.Response;
  } catch (err) {
    console.error(err);
    return { results: [] };
  }
};

/**
 * Get list of top podcasts from iTunes feed
 */
export const top = async (count: number): Promise<iTunes.Response> => {
  try {
    const url = getUrl(count);
    const res = await axios.get(url);
    if (res.status !== 200) {
      return { results: [] };
    }
    const feedRes = res.data as iTunes.FeedResponse;
    const topIds = feedRes.feed.entry.map(p => p.id.attributes['im:id']);
    return lookup(topIds);
  } catch(err) {
    console.error(err);
    return { results: [] };
  }
};