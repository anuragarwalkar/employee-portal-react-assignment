import React, { Fragment } from 'react';
import NavBar from '../../components/navbar/navbar';

const Layout = ({children}: any) => {
    return (
        <Fragment>
            <NavBar />
            {children}
        </Fragment>
    )
}

export default Layout;