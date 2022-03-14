export default function walletReducer(state, action) {
  switch(action.type) {
    case '[WALLET] Set Address':
      localStorage.setItem('address', action.address);
      console.log('set address', action)
      
      return {...state, address: action.address}
    case '[WALLET] Set Network':
      console.log('in state', state, action)
      
      return {...state, networkId: action.networkId}
    default:

      return {...state}
  }
}