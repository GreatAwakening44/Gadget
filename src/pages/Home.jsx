import React from 'react';
import Navbar from '../components/navbar/Navbar'
import MoCategories from './Categories';
import Shop from './Shop';
import Footer from './Footer';

const Home = () => {
    return (
        <>
        <Navbar />
        <MoCategories />
        <Shop />
        <Footer />
        </>
    )

}

export default Home