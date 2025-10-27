'use client';

import { useEffect, useState } from 'react';
import { Flex, Spin, theme } from 'antd';
import Section from '../_components/Section';
import { Text, Title } from '../_components/Text';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { client, urlFor } from '@/lib/sanity';

const equalWidth = {
    flexBasis: 0,
    flexGrow: 1,
};

interface SiteMeta {
    telephone?: string;
    email?: string;
    location?: string;
    contactBannerTitle?: string;
    contactBannerContent?: string;
    donationImage?: any;
}

const Contact: React.FC = () => {
    const [data, setData] = useState<SiteMeta | null>();
    const [loading, setLoading] = useState<boolean>();
    const { token } = theme.useToken();

    useEffect(() => {
        const fetchSiteMeta = async () => {
            try {
                const query = `*[_type == "siteMeta"][0]{
                    contactBannerTitle,
                    contactBannerContent,
                    telephone,
                    email,
                    location,
                    donationImage
                }`;
                const result: SiteMeta = await client.fetch(query);
                setData(result);
            } catch (err) {
                console.error('Error fetching site metadata:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSiteMeta();
    }, []);

    const bgImageUrl = data?.donationImage ? urlFor(data.donationImage).width(1600).url() : '';
    const color = token.colorPrimaryBgHover;
    const fontSize = 100;

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '100px 20px' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <>
            <Section bgImage={bgImageUrl} overlayColor={token.colorPrimaryTextActive}>
                <Title coro level={1} ls sx={{ color: 'white', opacity: 0.8 }}>
                    {data?.contactBannerTitle?.toUpperCase()}
                </Title>
                <Text center mt={60} mb={60} sx={{ maxWidth: 600, color: 'white', opacity: 0.8 }}>
                    {data?.contactBannerContent}
                </Text>
            </Section>
            <Section>
                <Title mb={60} primary ls coro>
                    CONTACT US
                </Title>
                <Flex align="center" justify="center" gap={40}>
                    <Flex vertical align="center" justify="center" style={equalWidth} gap={40}>
                        <PhoneOutlined style={{ fontSize, color }} />

                        <Text ls center primary>
                            {data?.telephone}
                        </Text>
                    </Flex>
                    <Flex vertical align="center" justify="center" style={equalWidth} gap={40}>
                        <MailOutlined style={{ fontSize, color }} />
                        <Text ls center primary>
                            {data?.email}
                        </Text>
                    </Flex>
                    <Flex vertical align="center" justify="center" style={equalWidth} gap={40}>
                        <EnvironmentOutlined style={{ fontSize, color }} />

                        <Text ls center primary>
                            {data?.location}
                        </Text>
                    </Flex>
                </Flex>
            </Section>
        </>
    );
};

export default Contact;
