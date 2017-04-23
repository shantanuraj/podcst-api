/**
 * Handlers for server
 */

'use strict';

import {
  IReply,
  Request,
} from 'hapi';

import {
  search,
  top,
} from '../data';

import {
  DEFAULT_PODCASTS_COUNT,
} from './constants';

export default {
  search(request: Request, reply: IReply) {
    const term = request.query.term;
    reply(search(term));
  },

  popular(request: Request, reply: IReply) {
    const limit =
      request.query.limit && parseInt(request.query.limit, 10) ||
      DEFAULT_PODCASTS_COUNT;
    reply(top(limit));
  },
};