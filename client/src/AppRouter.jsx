import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AvailableCarsContainer from './components/AvailableCars/AvailableCarsContainer';
import Dashboard from './components/Dashboard/Dashboard';
import CheckoutPage from './components/Checkout/CheckoutPage';
import './AppRouter.css';
import PageError from './components/ErrorPages/PageError';
import store from './mobx/store'

const AppRouter = () => (
  <div className="routingContainer">
    <Switch>
      <Route path="/" component={AvailableCarsContainer} exact store={store}/>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/cars/:id" component={CheckoutPage} />
      <Route component={PageError} />
    </Switch>
  </div>
);

export default AppRouter;
