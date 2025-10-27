'use client';

import { ReactNode } from 'react';
import AntLayout from 'antd/es/layout';
import Header from './Header';
import Footer from './Footer';

const Layout = ({
    children,
}: Readonly<{
    children: ReactNode;
}>) => {
    return (
        <AntLayout>
            <Header />
            {children}
            <Footer />
        </AntLayout>
    );
};

export default Layout;
