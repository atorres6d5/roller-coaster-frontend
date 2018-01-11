import { combineReducers } from 'redux'
import _ from 'lodash'

import {  ADD_ROLLER_COASTER,
          DELETE_ROLLER_COASTER,
          UPDATE_ROW,
          FETCH_ROLLER_COASTERS_SUCCESS,
          UPDATE_ROLLER_COASTER } from '../actions'

const INITIAL_STATE = []

function roller_coasters(state = INITIAL_STATE, action){
  switch (action.type) {
    case FETCH_ROLLER_COASTERS_SUCCESS:
      return action.payload
    case ADD_ROLLER_COASTER:
      const sorted_coasters = state.sort((a,b) => a.id-b.id)
      const id = state.length > 0 ? sorted_coasters[state.length-1].id + 1 : 1
      const coaster = {id, ...action.payload}
      return [..._.cloneDeep(state), coaster]

    case UPDATE_ROLLER_COASTER:
      return [...state.map((e,i) => {
        if(e.id === action.payload.id) return action.payload
        return { ...e }
      })]

    case DELETE_ROLLER_COASTER:
      return [..._.cloneDeep(state).filter(e => e.id !== action.payload)]

    default:
      return state
  }
}

function row_to_update(state = null, action){
  switch(action.type){
    case UPDATE_ROLLER_COASTER:
    case UPDATE_ROW:
      return action.payload
    default:
      return state
  }
}

export default combineReducers({
  roller_coasters,
  row_to_update
})
