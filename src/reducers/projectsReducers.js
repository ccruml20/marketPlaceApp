"use strict"

export function projectsReducers(state={
  projects: []
}, action){
  switch(action.type){

    // Reducer for GET request
    case "GET_PROJECTS":
    return {...state, projects:[...action.payload ]}
    break;

    // Reducer for posting project with certain ids
    case "POST_PROJECT":
    return {...state, projects: [...state.projects, ...action.payload], msg:'Saved! Click to continue', style: 'success', validation: 'success'}
    break;

    case "POST_PROJECT_REJECTED":
    return {...state, msg: 'Please try again', style: 'danger', validation: 'error'}
    break;

    case "RESET_BUTTON":
    return {...state, msg: null, style: 'primary', validation: null}
    break;

    // Reducer for deleting projects with certain ids
    case "DELETE_PROJECT":
    const currentProjectToDelete = [...state.projects];
    const indexToDelete = currentProjectToDelete.findIndex(
      function(projects){
        return projects._id == action.payload;
      }
    )
    return {projects: [...currentProjectToDelete.slice(0, indexToDelete), ...currentProjectToDelete.slice(indexToDelete + 1)]}
    break;

    // Reducer for updateing projects with certain _ids
    case "UPDATE_PROJECT":
    const currentProjectToUpdate = [...state.projects];
    const indexToUpdate = currentProjectToUpdate.findIndex(
      function(project){
        return project._id === action.payload._id;
      }
    )
    const newProjectToUpdate ={
      ...currentProjectToUpdate[indexToUpdate],
      title: action.payload.title
    }
    return {projects: [...currentProjectToUpdate.slice(0, indexToUpdate), newProjectToUpdate, ...currentProjectToUpdate.slice(indexToUpdate + 1)]}
  }

  return state
}
