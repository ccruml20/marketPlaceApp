"use strict"
//import React and React-Dom
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';




//import Redux and Logger Middleware
import {applyMiddleware, createStore} from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';



//Import reducers
import reducers from './reducers/index';

import {addToCart} from './actions/cartActions';
import {postProjects, deleteProjects, updateProjects} from './actions/projectsActions';

//React Router
import {Router, Route, IndexRoute, browserHistory} from 'react-router';


// Create Redux Store  STEP: 1
const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

import ProjectsList from './components/pages/projectsList';
import Cart from './components/pages/cart';
import ProjectsForm from './components/pages/projectsForm';
import Main from './main';

const Routes = (
  <Provider store ={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={ProjectsList} />
        <Route path="/admin" component={ProjectsForm} />
        <Route path="/cart" component={Cart} />
      </Route>
    </Router>
  </Provider>
)
render(
  Routes, document.getElementById('app')

)
// Create and Dispatch Actions STEP: 2

// store.dispatch(postProjects(
//   [{
//     id: 1,
//     title: "this is the first title",
//     description: "this is the first description",
//     price: 24.00
//   },
//   {
//     id: 2,
//     title: "this is the second title",
//     description: "this is the second description",
//     price: 34.00
//   }]
// ))

// // DELETE a Project
//
// store.dispatch(deleteProjects(
//   {id:1}
// ))
//
// //UPDATE a Projcet
//
// store.dispatch(updateProjects(
//   {
//     id:2,
//     title: 'Learn, you dick'
//   }
//
// ))
//
// // CART Actions
// // ADD to cart
// store.dispatch(addToCart([{id: 1 }]))
