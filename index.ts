/**
 * Application root
 */

'use strict';

import {
  createServer,
} from './src/server';

const main = async (message: string) => {
  try {
    const server = await createServer();
    await server.start();
    console.log(`Server running at ${server.info.uri}`);
  } catch(err) {
    console.error(err);
  }
};

main('Hello, world');