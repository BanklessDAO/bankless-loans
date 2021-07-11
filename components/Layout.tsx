import React, { ReactComponentElement } from "react"
import Navbar  from "./Navbar"

export default function Layout({children}:any) {
    return(
        <React.Fragment>
            <Navbar/>
            {children}
        </React.Fragment>
    )
}