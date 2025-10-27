import { Flex, theme } from 'antd';

interface SectionProps {
    children: React.ReactNode;
    bgImage?: string;
    bgColor?: string;
    overlayColor?: string;
}

const Section = ({ children, bgImage, bgColor, overlayColor }: SectionProps) => {
    const { token } = theme.useToken();

    return (
        <Flex
            justify="center"
            align="center"
            style={{
                position: 'relative',
                width: '100%',
                backgroundColor: bgColor ? bgColor : token.colorBgContainer,
                backgroundImage: bgImage ? `url(${bgImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                paddingTop: 100,
                paddingBottom: 100,
            }}
        >
            {overlayColor && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: overlayColor,
                        opacity: 0.8,
                        zIndex: 0,
                    }}
                />
            )}

            <Flex
                vertical
                justify="center"
                align="center"
                style={{
                    width: '80%',
                    maxWidth: 2000,
                    position: 'relative',
                }}
            >
                {children}
            </Flex>
        </Flex>
    );
};

export default Section;
