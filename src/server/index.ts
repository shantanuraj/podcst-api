/**
 * Server
 */

'use strict';

import { Server } from 'hapi';
import config from './config';

export const createServer = async () => {
  try {
    const server = new Server();
    server.connection(config);

    return server;
  } catch (err) {
    // Don't fail silently
    throw err;
  }
};
