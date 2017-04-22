/**
 * Application root
 */

'use strict';

import {
  initCache,
} from './src/cache'
import {
  createServer,
} from './src/server';

const main = async (message: string) => {
  try {
    // Initiate Redis cache
    initCache();
    // Configure server
    const server = await createServer();
    // Start server
    await server.start();
    console.log(`Server running at ${server.info.uri}`);
  } catch(err) {
    console.error(err);
  }
};

main('Hello, world');