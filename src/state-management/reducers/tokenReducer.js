export default function tokenReducer(state, action) {
  switch(action.type) {
    case '[TOKEN] SET_SORT':
      state = {...state, sort: action.sort}

      return {...state}
    // case 'GET_TOKENS':
    //   console.log('DISPATCHING', action)
    //   state.tokens = [...action.tokens]

    //   console.log('state:', state)
    //   return {...state}
    // case 'NEW_TOKEN':
    //   console.log('DISPATCHING', action)
    //   state.tokens = [...state.tokens, action.token]

    //   console.log('state:', state)
    //   return {...state}
    default:

      return {...state}
  }
}