import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '../src/pages/Home.jsx';
import { CartProvider } from '../src/components/shop/Cartcontext.jsx';

const App = () => {
    return (
      <>
        <CartProvider>
        <Routes>
            <Route path='/' element={<Home />} />
        </Routes>
      </CartProvider>
      </>
    )
}

export default App