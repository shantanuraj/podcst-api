import * as Koa from 'koa';

import { top as topData } from '../data';
import { sendResponse } from '../utils/send-response';
import { useHandler } from '../utils/use-handler';
import { DEFAULT_PODCASTS_COUNT, MAX_PODCASTS_COUNT, MIN_PODCASTS_COUNT } from './constants';

function validLimit (limitStr: string) {
  let limit = parseInt(limitStr, 10) || DEFAULT_PODCASTS_COUNT;
  limit = Math.min(
    limit,
    MAX_PODCASTS_COUNT
  );
  limit = Math.max(
    limit,
    MIN_PODCASTS_COUNT
  );
  return limit;
}

async function top(ctx: Koa.Context) {
  let { limit } = ctx.query;
  limit = validLimit(limit);
  const res = await topData(limit);
  sendResponse(ctx, res);
}

export default useHandler(top);
