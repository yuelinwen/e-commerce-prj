import React from 'react';

import './App.css';
import { Route, Switch } from 'react-router-dom';

import ShopPage from './pages/shop/shop.componenet';
import HomePage from './pages/homepage/homepage.componenet';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.componenet';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop' component={ShopPage} />
        <Route exact path='/sign-in' component={SignInAndSignUpPage} />
      </Switch>
    </div>
  );
}

export default App;
