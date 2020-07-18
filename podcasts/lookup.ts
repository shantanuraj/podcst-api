/**
 * Podcast lookup API
 */

'use strict';

import axios from 'axios';

import { ITUNES_API } from './constants';

import { adaptResponse } from './adapter';

/**
 * Url for directory lookup based on id/s
 */
const getLookupUrl = (ids: string[]) => `${ITUNES_API}/lookup?id=${ids.join(',')}`;

/**
 * Get adapted list of podcasts from iTunes API
 */
const lookup = async (ids: string[]): Promise<App.Podcast[]> => {
  try {
    const url = getLookupUrl(ids);
    const res = await axios.get(url);
    if (res.status !== 200) {
      return [];
    }
    return adaptResponse(res.data as iTunes.Response);
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default lookup;
