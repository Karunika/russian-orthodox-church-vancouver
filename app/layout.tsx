import type { Metadata } from 'next';
import './globals.css';
import 'antd/dist/reset.css';
import { ConfigProvider } from 'antd';
import token from './_theme/token';
import Layout from './_components/Layout';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <ConfigProvider theme={{ token }}>
                    <Layout>{children}</Layout>
                </ConfigProvider>
            </body>
        </html>
    );
}
