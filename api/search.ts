import * as Koa from 'koa';

import { feed, search as searchData } from '../data';
import { feedToSearchResponse, isURL } from '../utils';
import { useHandler } from '../utils/use-handler';

async function search(ctx: Koa.Context) {
  const { term } = ctx.query;
  if (!term) {
    return invalidUrl(ctx);
  }
  const res: App.PodcastSearchResult[] = await (isURL(term)
    ? feed(term).then(feedToSearchResponse(term))
    : searchData(term));

  ctx.body = res;
}

function invalidUrl(ctx: Koa.Context) {
  ctx.status = 400;
  ctx.body = {
    message: 'parameter `term` cannot be empty',
  };
}

export default useHandler(search);
