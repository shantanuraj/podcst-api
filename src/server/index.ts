/**
 * Server
 */

'use strict';

import {
  IRouteConfiguration,
  IServerConnectionOptions,
  Server,
} from 'hapi';

import {
  enableCors,
} from './exts';
import plugins from './plugins';

export const createServer = async (
  connection: IServerConnectionOptions,
  routes: IRouteConfiguration[],
) => {
  try {
    const server = new Server();
    server.connection(connection);
    server.ext('onPreResponse', enableCors);

    await server.register(plugins);
    server.route(routes);

    return server;
  } catch (err) {
    // Don't fail silently
    throw err;
  }
};
