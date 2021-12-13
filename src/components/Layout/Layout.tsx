import { Fragment } from 'react'
import Navbar from './Navbar'
// import Footer from './Footer'

export default function Layout({ children }: JSX.ElementChildrenAttribute) {
    return (
        <Fragment>
            <Navbar />
            {children}
            {/* <Footer/> */}
        </Fragment>
    )
}
