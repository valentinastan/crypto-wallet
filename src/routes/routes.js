import React from 'react'
import { Route, Routes } from 'react-router-dom'

import ConnectWalletPage from '../pages/connectWalletPage';
import WalletPage from '../pages/walletPage';

export const appRoutes = (
  <Routes>
    <Route exact path="wallet" element={<WalletPage/>}/>
    <Route exact path="*" element={<ConnectWalletPage/>}/>
  </Routes>
);