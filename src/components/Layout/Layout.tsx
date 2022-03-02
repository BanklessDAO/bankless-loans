import { Fragment } from 'react'
import Navbar from './Navbar'

export default function Layout({ children }: JSX.ElementChildrenAttribute) {
    return (
        <Fragment>
            <Navbar />
            {children}
        </Fragment>
    )
}
