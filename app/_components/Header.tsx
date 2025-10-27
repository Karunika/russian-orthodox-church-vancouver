'use client';

import { Menu, Layout, theme } from 'antd';
import { CSSProperties, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const items = [
    { key: '1', label: 'Home', route: '/' },
    { key: '2', label: 'About Us', route: '/about' },
    { key: '3', label: 'News', route: '/news' },
    { key: '4', label: 'Contact Us', route: '/contact' },
];

const Header = () => {
    const { Header: AntHeader } = Layout;
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const { token } = theme.useToken();
    const bgColor = token.colorBgContainer;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const headerStyle: CSSProperties = {
        position: pathname === '/' ? 'fixed' : 'sticky',
        top: 0,
        zIndex: 100,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        transition: 'background-color 0.3s ease',
        backgroundColor: scrolled ? bgColor : 'rgba(255, 255, 255, 0.4)',
    };

    const menuItems = items.map((item) => ({
        key: item.key,
        label: item.label,
        onClick: () => router.push(item.route),
    }));

    const selectedKey = items.find((item) => item.route === pathname)?.key ?? '1';

    return (
        <AntHeader style={headerStyle}>
            <div className="demo-logo" />
            <Menu
                mode="horizontal"
                selectedKeys={[selectedKey]}
                items={menuItems}
                style={{ background: 'transparent', flex: 1, minWidth: 0 }}
            />
        </AntHeader>
    );
};

export default Header;
