'use client';

import { ReactNode } from 'react';
import AntText from 'antd/es/typography/Text';
import AntTitle from 'antd/es/typography/Title';

interface TextProps {
    children: ReactNode;
    coro?: boolean; // Use coro font if true
    primary?: boolean; // Primary color if true, secondary otherwise
    ls?: boolean; // Letter spacing
    mb?: number; // Margin bottom
    mt?: number; // Margin top
    center?: boolean;
    sx?: { [key: string]: any };
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
        level?: 3 | 1 | 5 | 2 | 4;
    } & TextProps
>) => {
    return (
        <AntTitle
            level={level}
            className={coro ? 'font-coro' : 'font-nuni'}
            type={primary ? 'primary' : 'secondary'}
            style={{
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
    return (
        <AntText
            className={coro ? 'font-coro' : 'font-nuni'}
            type={primary ? 'primary' : 'secondary'}
            style={{
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
