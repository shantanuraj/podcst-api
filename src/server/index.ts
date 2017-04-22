/**
 * Server
 */

'use strict';

import { Server } from 'hapi';

import config from './config';
import {
  enableCors,
} from './exts';

export const createServer = async () => {
  try {
    const server = new Server();
    server.connection(config);
    server.ext('onPreResponse', enableCors);

    return server;
  } catch (err) {
    // Don't fail silently
    throw err;
  }
};
