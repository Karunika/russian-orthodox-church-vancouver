'use client';

import { Menu, Layout, theme, Flex } from 'antd';
import { CSSProperties, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Text, Title } from './Text';

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

    const isBig = !scrolled && pathname === '/';

    const headerStyle: CSSProperties = {
        position: pathname === '/' ? 'fixed' : 'sticky',
        height: !scrolled && pathname === '/' ? 100 : 'auto',
        top: 0,
        zIndex: 20,
        width: '100%',
        display: pathname.startsWith('/studio') ? 'none': 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.3s ease',
        backgroundColor: scrolled ? bgColor : 'rgba(255, 255, 255, 0.6)',
    };


    const menuItems = items.map((item) => ({
        key: item.key,
        label: item.label,
        onClick: () => router.push(item.route),
    }));

    const selectedKey = items.find((item) => item.route === pathname)?.key ?? '1';
    const transition = 'all 0.3s ease';

    return (
        <AntHeader style={headerStyle}>
            <Flex align="center">
                <img
                    height={isBig ? 80 : 50}
                    src="church.png"
                    style={{ transition }}
                    onClick={() => router.push('/')}
                />
                <Flex vertical gap={0} justify="flex-end" style={{ marginLeft: 10, transition }}>
                    <Title
                        coro
                        level={isBig ? 1 : 3}
                        mt={isBig ? 0 : 8}
                        sx={{ lineHeight: isBig ? 1.2 : 1, transition }}
                    >
                        Holy Trinity Russian Orthodox Church
                    </Title>
                    <Text sx={{ lineHeight: isBig ? 0.8 : 1.4, transition }} ls>
                        Vancouver, British Columbia, Canada
                    </Text>
                </Flex>
            </Flex>
            <Menu
                mode="horizontal"
                selectedKeys={[selectedKey]}
                items={menuItems}
                style={{ background: 'transparent' }}
            />
        </AntHeader>
    );
};

export default Header;
