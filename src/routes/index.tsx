import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { TodosContainer } from 'containers/todos';
import JsonToJavaContainer  from 'containers/json-to-java';

interface IRoutesProps {}

export const Routes: React.FC<IRoutesProps> = () => (
  <Switch>
    {/* <Route path="/" exact={true} component={TodosContainer} /> */}
    <Route path="/" exact={true} component={JsonToJavaContainer} />
  </Switch>
);
