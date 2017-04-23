/**
 * Server routes
 */

'use strict';

import {
  IRouteConfiguration,
} from 'hapi';

import handler from './handlers';

const routes: IRouteConfiguration[] = [
  {
    path: '/top',
    method: 'GET',
    handler: handler.popular,
  },
  {
    path: '/search',
    method: 'GET',
    handler: handler.search,
  },
];

export default routes;