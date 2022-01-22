import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ConnectWalletPage from '../pages/connectWalletPage';
import WalletPage from '../pages/walletPage';

export const appRoutes = (
  //<BrowserRouter>
    <Routes>
      <Route exact path="wallet" element={<WalletPage/>}/>
      <Route exact path="*" element={<ConnectWalletPage/>}/>
    </Routes>
 // </BrowserRouter>
);