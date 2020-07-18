import * as Koa from 'koa';

import { useHandler } from '../utils/use-handler';

async function notFound(ctx: Koa.Context) {
  ctx.status = 404;
  ctx.body = {
    message: 'not found',
  };
}

export default useHandler(notFound);
