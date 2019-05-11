/**
 * Podcast Search API
 */

import axios from 'axios';

import { ITUNES_API } from './constants';

import lookup from '../podcasts/lookup';

/**
 * Generate url for RSS feed mapped to JSON, for the given limit
 */
const getUrl = (limit: number) =>
  `${ITUNES_API}/us/rss/toppodcasts/limit=${limit}/explicit=true/json`;

/**
 * Get list of top podcasts from iTunes feed
 */
const top: App.Top = async (count: number): Promise<App.Podcast[]> => {
  try {
    const url = getUrl(count);
    const res = await axios.get(url);
    if (res.status !== 200) {
      return [];
    }
    const feedRes = res.data as iTunes.FeedResponse;
    const topIds = feedRes.feed.entry.map(p => p.id.attributes['im:id']);
    return lookup(topIds);
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default top;
