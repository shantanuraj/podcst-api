/**
 * Application root
 */

'use strict';

const main = async (message: string) => {
  const res = await message;
  console.log(res);
};

main('Hello, world');