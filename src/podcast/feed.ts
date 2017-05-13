/**
 * Podcast Episode lookup API
 */

import axios from 'axios';
import { stringify } from 'querystring';

import {
  adaptFeed,
} from './parser';

const fetcher = axios.create({
  method: 'GET',
  responseType: 'text',
});

/**
 * Returns list of podcasts from search
 */
export const feed: App.FeedLookup = async (url: string): Promise<App.EpisodeListing | null> => {
  try {
    const res = await fetcher.request({ url });
    if (res.status !== 200) {
      console.error('Could not get episodes from:', url);
      return null;
    }
    return adaptFeed(res.data as string) as any;
  } catch(err) {
    console.error(err);
    return null;
  }
};
