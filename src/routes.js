import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContainer from './container/AppContainer';
const routes = (
  <div>
    <AppContainer />
  </div>
);

const RootRouter = () => <Router basename="/">{routes}</Router>;

export default RootRouter;
