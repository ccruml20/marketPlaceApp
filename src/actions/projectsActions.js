"use strict"
import axios from 'axios';

//GET Projects action
export function getProjects(){
  return function(dispatch){
    axios.get("/api/projects")
    .then(function(response){
      dispatch({type:"GET_PROJECTS", payload:response.data})
    })
    .catch(function(err){
      dispatch({type:"GET_PROJECT_REJECTED", payload:err})
    })
  }
}

//POST Projects action
export function postProjects(project){
  return function(dispatch){
    axios.post("/api/projects", project)
    .then(function(response){
      dispatch({type:"POST_PROJECT", payload:response.data})
    })
    .catch(function(err){
      dispatch({type:"POST_PROJECT_REJECTED", payload:"there was an error while posting project"})
    })
  }
}

//DELETE Projects action
export function deleteProjects(id){
  return function(dispatch){
    axios.delete("/api/projects/" + id)
    .then(function(response){
      dispatch({type:"DELETE_PROJECT", payload:id})
    })
    .catch(function(err){
      dispatch({type:"DELETE_PROJECT_REJECTED", payload:err})
    })
  }
}

//UPDATE Projects action
export function resetButton(){
  return {
    type: "RESET_BUTTON"
  }
}
