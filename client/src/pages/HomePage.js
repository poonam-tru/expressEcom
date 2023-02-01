import React from 'react'
import { getUserCred } from "../utils/helpers";
import Header from './Header';
import './HomePage.css'

function HomePage() {
    const username = getUserCred();
  return (
    <>
        <Header />
        <div className='home_page'>
        <h2 className='home_page_head'>{username && `Hi, ${username}.`} Welcome To HomePage</h2>
        </div>
    </>
  )
}

export default HomePage

