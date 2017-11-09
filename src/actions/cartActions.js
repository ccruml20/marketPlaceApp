"use strict"
import axios from 'axios';
//ADD to cart

export function addToCart(cart){
  return function(dispatch){
    axios.post('/api/cart', cart)
    .then(function(response){
      dispatch({type:"ADD_TO_CART", payload: response.data})
    })
    .catch(function(err){
      dispatch({type:"ADD_TO_CART_REJECTED", msg: 'error adding to cart'})
    })
  }
}

export function deleteCartItem(cart){
  return {
    type: "DELETE_CART_ITEM",
    payload: cart
  }
}

export function updateCartItem(_id, unit, cart){
  const currentProjectToUpdate = cart
  const indexToUpdate = currentProjectToUpdate.findIndex(
    function(project){
      return project._id === _id;
    }
  )
  const newProjectToUpdate ={
    ...currentProjectToUpdate[indexToUpdate],
    quantity: currentProjectToUpdate[indexToUpdate].quantity + unit
  }
  console.log(newProjectToUpdate, 'this is the new project');
  let cartUpdate =[...currentProjectToUpdate.slice(0, indexToUpdate), newProjectToUpdate,
  ...currentProjectToUpdate.slice(indexToUpdate + 1)]

  return function(dispatch){
    axios.post("/api/cart", cartUpdate)
    .then(function(response){
      dispatch({type:"UPDATE_CART", payload: response.data})
    })
    .catch(function(err){
      dispatch({type:"UPDATE_CART_REJECTED", msg: 'error adding to cart'})
    })
  }
}
