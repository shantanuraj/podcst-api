import * as Koa from 'koa';

import { feed as feedData } from '../data';
import { sendResponse } from '../utils/send-response';
import { useHandler } from '../utils/use-handler';

async function feed(ctx: Koa.Context) {
  const { url } = ctx.query;
  if (!url) {
    return invalidUrl(ctx);
  }
  const res = await feedData(url);
  sendResponse(ctx, res);
}

function invalidUrl(ctx: Koa.Context) {
  ctx.status = 400;
  ctx.body = {
    message: 'parameter `url` cannot be empty',
  };
}

export default useHandler(feed);
