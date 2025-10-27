'use client';

import { ReactNode } from 'react';
import { theme } from 'antd';
import AntText from 'antd/es/typography/Text';
import AntTitle from 'antd/es/typography/Title';

interface TextProps {
    children: ReactNode;
    coro?: boolean; // Use coro font if true
    primary?: boolean; // Use theme primary color if true
    ls?: boolean; // Letter spacing
    mb?: number; // Margin bottom
    mt?: number; // Margin top
    center?: boolean;
    sx?: React.CSSProperties; // Allow style overrides
}

export const Title = ({
    children,
    level = 3,
    coro = false,
    primary = false,
    ls = false,
    mb = 0,
    mt = 0,
    center = false,
    sx = {},
}: Readonly<
    {
        level?: 1 | 2 | 3 | 4 | 5;
    } & TextProps
>) => {
    const { token } = theme.useToken();

    return (
        <AntTitle
            level={level}
            className={coro ? 'font-coro' : 'font-nuni'}
            style={{
                color: primary ? token.colorPrimary : token.colorText,
                textAlign: center ? 'center' : 'left',
                letterSpacing: ls ? '0.2em' : 0,
                marginBottom: mb,
                marginTop: mt,
                fontWeight: 100,
                ...sx,
            }}
        >
            {children}
        </AntTitle>
    );
};

export const Text = ({
    children,
    coro = false,
    primary = false,
    ls = false,
    mb = 0,
    mt = 0,
    center = false,
    sx = {},
}: Readonly<TextProps>) => {
    const { token } = theme.useToken();

    return (
        <AntText
            className={coro ? 'font-coro' : 'font-nuni'}
            style={{
                color: primary ? token.colorPrimary : token.colorText,
                textAlign: center ? 'center' : 'left',
                letterSpacing: ls ? '0.05em' : 0,
                marginBottom: mb,
                marginTop: mt,
                fontWeight: 100,
                ...sx,
            }}
        >
            {children}
        </AntText>
    );
};
