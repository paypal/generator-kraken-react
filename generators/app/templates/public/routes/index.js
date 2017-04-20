import React from 'react';
import {
  Route,
  IndexRoute
} from 'react-router';

import Layout from '../components/Layout';
import Todo from '../components/Todo';

const requestURI = require('../../config/config.json').requestURI;

const Index = (
  <Route path={requestURI} component={Layout}>
    <IndexRoute component={Todo} />
    <Route path="tasks" component={Todo} />
  </Route>
);

export default Index;
