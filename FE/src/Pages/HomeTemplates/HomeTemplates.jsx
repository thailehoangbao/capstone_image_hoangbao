import React from 'react'
import Header from './_components/Header/Header'
import Footer from './_components/Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function HomeTemplates() {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}
