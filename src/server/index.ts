/**
 * Server
 */

'use strict';

import { Server } from 'hapi';

import config from './config';
import {
  enableCors,
} from './exts';
import plugins from './plugins';

export const createServer = async () => {
  try {
    const server = new Server();
    server.connection(config);
    server.ext('onPreResponse', enableCors);

    await server.register(plugins);

    return server;
  } catch (err) {
    // Don't fail silently
    throw err;
  }
};
