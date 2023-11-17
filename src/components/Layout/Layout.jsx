import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast';

const Layout = (props) => {
    return (
        <div className='main'>
            <Header />
            <main style={{ minHeight: "90vh",overflowX: "hidden" }}>
                <Toaster />
                {props.children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout