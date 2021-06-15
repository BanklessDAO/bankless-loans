import React from "react"
import Navbar  from "./Navbar"

export default function Layout({children}) {
    return(
        <React.Fragment>
            <Navbar/>
            {children}
        </React.Fragment>
    )
}