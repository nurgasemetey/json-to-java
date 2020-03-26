import React from 'react';
import { Route, Switch } from 'react-router-dom';

import TodosContainer from '../containers/todos';

const routes = () => (
  <Switch>
    <Route path="/" exact={true} component={TodosContainer} />
  </Switch>
);

export default routes;
