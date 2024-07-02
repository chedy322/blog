import React from 'react';
import Header from './component.js/header'
import Footer from './component.js/Footer'
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

