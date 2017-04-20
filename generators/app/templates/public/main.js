import React from 'react';
import { Router } from 'react-router';

import appRoutes from './routes';
import initStore from './store';

const Client = require('react-engine/lib/client');

const options = {
  react: React,
  router: Router,
  routes: appRoutes,
  reduxStoreInitiator: initStore,
  viewResolver: viewName => require(`./components/${viewName}`)
};

(function bootLoader() {
  if (document.readyState === 'complete') {
    // remove all handlers that were set so that we dont keep
    // hitting boot loader for any future DOM `readyState` changes.
    document.onreadystatechange = null;
    Client.boot(options);
  }

  // if the readyState is not `complete`, attach self
  // or this function as the onreadystatechange handler.
  document.onreadystatechange = bootLoader;
}());
