/**
 * Handlers for server
 */

'use strict';

import {
  IReply,
  Request,
} from 'hapi';

import {
  feed,
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

  feed(request: Request, reply: IReply) {
    const url = request.query.url;
    if (!url) {
      reply({
        message: 'Missing param url',
      }).statusCode = 400;
    } else {
      reply(feed(url));
    }
  }
};
