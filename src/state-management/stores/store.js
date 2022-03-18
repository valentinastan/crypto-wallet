import React from 'react';
import tokenReducer from '../reducers/tokenReducer';
import walletReducer from '../reducers/walletReducer';

const initialState = {
  walletState: {
    address: ' ',
    networkId: null,
  },
  tokenState: {
    tokens: [],
    sort: {},
  }
}

const Store = React.createContext();
const Dispatch = React.createContext();

const combinedReducers = (state, action) => ({
  walletState: walletReducer(state.walletState, action),
  tokenState: tokenReducer(state.tokenState, action),
})

function StateProvider({ children }) {
  const [state, dispatch] = React.useReducer(combinedReducers, initialState)

  return (
    <Store.Provider value={state}>
      <Dispatch.Provider value={dispatch}>
        {children}
      </Dispatch.Provider>
    </Store.Provider>
  )
}

function useGlobalState() {
  const context = React.useContext(Store)
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider')
  }
  return context
}

function useDispatch() {
  const context = React.useContext(Dispatch)
  if (context === undefined) {
    throw new Error('useCountDispatch must be used within a CountProvider')
  }
  return context
}

function useStore() {
  return [useGlobalState(), useDispatch()]
}
export { StateProvider, useGlobalState, useDispatch, useStore }