import { Fragment } from 'react'
import Navbar from './Navbar'

export default function Layout({ children }: any) {
    return (
        <Fragment>
            <Navbar />
            {children}
        </Fragment>
    )
}
