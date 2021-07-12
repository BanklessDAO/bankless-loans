import React, { ReactComponentElement } from "react"
import Navbar  from "./Navbar"
import Footer from './Footer'

export default function Layout({children}:any) {
    return(
        <React.Fragment>
            <Navbar/>
            {children}
            <Footer/>
        </React.Fragment>
    )
}