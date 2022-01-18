import React from 'react';

import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ShopPage from './pages/shop/shop.component';
import HomePage from './pages/homepage/homepage.component';
import ContactPage from './pages/contact/contact.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
//import { addCollectionAndDocuments } from './firebase/firebase.utils';  
//used to added to database automatically


import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
//import { selectCollectionsForPreview } from './redux/shop/shop.selector';

import { fetchCollectionsStart } from './redux/shop/shop.actions';

class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props
    //additional
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
    //*********** */
    //const { setCurrentUser, collectionsArray } = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({ currentUser: { id: snapShot.id, ...snapShot.data() } });
        }, () => { console.log(this.state) })
      }
      setCurrentUser(userAuth)
      //addCollectionAndDocuments('NewCollections', collectionsArray.map(({ title, items }) => ({ title, items })))
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (<div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/sign-in' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
        <Route exact path='/contact' component={ContactPage} />
      </Switch>
    </div>)
  };
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  //collectionsArray: selectCollectionsForPreview
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  //additional
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
