export default function walletReducer(state, action) {
  switch(action.type) {
    case '[WALLET] Set Address':
      state.address = action.address
      localStorage.setItem('address', action.address);

      return {...state}
    default:

      return {...state}
  }
}