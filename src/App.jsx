import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '../src/pages/Home.jsx';
import { CartProvider } from '../src/components/shop/Cartcontext.jsx';
import Bloger from './pages/Bloger.jsx';
import BlogPost from './components/blog/Blogpost.jsx'

const App = () => {
    return (
      <>
        <CartProvider>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/blog' element={<Bloger/>} />
            <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
      </CartProvider>
      </>
    )
}

export default App