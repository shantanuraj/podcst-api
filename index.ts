/**
 * Application root
 */

'use strict';

import {
  connection,
  routes,
} from './src/api';

import {
  initCache,
} from './src/cache';
import {
  createServer,
} from './src/server';

const main = async () => {
  try {
    // Initiate Redis cache
    initCache();
    // Configure server
    const server = await createServer(connection, routes);
    // Start server
    await server.start();
    console.log(`Server running at ${server.info.uri}`);
  } catch(err) {
    console.error(err);
  }
};

main();