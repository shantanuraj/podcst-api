/**
 * Handlers for server
 */

"use strict";

import { IReply, Request } from "hapi";

import { feed, search, top } from "../data";

import { DEFAULT_PODCASTS_COUNT, URL_REGEX } from "./constants";

import { convertFeedToSearchResponse } from "./utils";

export default {
  search(request: Request, reply: IReply) {
    const term = request.query.term;
    const res: Promise<App.PodcastSearchResult[]> = URL_REGEX.test(term)
      ? feed(term).then(convertFeedToSearchResponse(term))
      : search(term);
    reply(res);
  },

  popular(request: Request, reply: IReply) {
    const limit =
      (request.query.limit && parseInt(request.query.limit, 10)) ||
      DEFAULT_PODCASTS_COUNT;
    reply(top(limit));
  },

  feed(request: Request, reply: IReply) {
    const url = request.query.url;
    if (!url) {
      reply({
        message: "Missing param url",
      }).statusCode = 400;
    } else {
      const decodedUrl = decodeURIComponent(url);
      reply(feed(decodedUrl));
    }
  },
};
