/**
 * Plugins for server
 */

import Good = require('good');
import Inert = require('inert');

const goodOptions = {
  ops: { interval: 1000 },
  reporters: {
    consoleReporter: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: '*', response: '*' }]
      },
      { module: 'good-console' },
      'stdout',
    ],
  },
};

export default [
  {
    register: Good,
    options: goodOptions,
  },
  {
    register: Inert,
  },
];