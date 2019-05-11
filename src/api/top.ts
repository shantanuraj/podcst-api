import * as Koa from 'koa';

import { top as topData } from '../data';
import { useHandler } from '../utils/use-handler';
import { DEFAULT_PODCASTS_COUNT, MAX_PODCASTS_COUNT } from './constants';

async function top(ctx: Koa.Context) {
  let { limit } = ctx.query;
  limit = Math.min((limit && parseInt(limit, 10)) || DEFAULT_PODCASTS_COUNT, MAX_PODCASTS_COUNT);
  const res = await topData(limit);
  ctx.body = res;
}

export default useHandler(top);
