"use strict"
// combineReducers takes all imported reducers and bundles them into one file //
import {combineReducers} from 'redux';

// import all other files from reducers folder //
import {projectsReducers} from './projectsReducers';
import {cartReducers} from './cartReducers';

// export combineReducers that contains all other reducer files //
export default combineReducers({
  projects: projectsReducers,
  cart: cartReducers
})
