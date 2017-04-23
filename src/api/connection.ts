/**
 * API Server configuration
 */

import {
  IServerConnectionOptions,
} from 'hapi';

export default {
  port: '5000',
  labels: 'api',
} as IServerConnectionOptions;