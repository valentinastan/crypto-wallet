export default function walletReducer(state, action) {
  switch(action.type) {
    case '[WALLET] Set Address':
      // state.address = action.address
      localStorage.setItem('address', action.address);

      return {...state, address: action.address}
    case '[WALLET] Set Network':
      // state.networkId = action.networkId
console.log('in state', state, action)
      return {...state, networkId: action.networkId}
    default:

      return {...state}
  }
}