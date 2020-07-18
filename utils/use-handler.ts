import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';

async function successMiddleware(ctx: Koa.Context, next: Function) {
  ctx.res.statusCode = 200;
  try {
    await next();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export function useHandler(routeHandler: Koa.Middleware) {
  const app = new Koa();

  app.use(logger());
  app.use(bodyParser());
  app.use(successMiddleware);
  app.use(routeHandler);

  return app.callback();
}
