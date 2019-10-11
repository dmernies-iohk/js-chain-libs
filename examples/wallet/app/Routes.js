import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import Home from './containers/Home';
import Index from './containers/Index';

export default () => (
  <App>
    <Switch>
      <Route path={routes.HOME} component={Home} />
      <Route path={routes.INPUT_KEYS} component={() => <p> TODO</p>} />
      <Route path={routes.INDEX} component={Index} />
    </Switch>
  </App>
);
