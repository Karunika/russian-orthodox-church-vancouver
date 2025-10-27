'use client';

import { useEffect, useState } from 'react';
import { Button, Spin, theme } from 'antd';
import { client, urlFor } from '@/lib/sanity';
import Section from '../_components/Section';
import { Title, Text } from '../_components/Text';

interface SiteMeta {
    paypalLink?: string;
    donationImage?: any;
    aboutBannerTitle?: string;
    aboutBannerContent?: string;
}

const About = () => {
    const [data, setData] = useState<SiteMeta | null>(null);
    const [loading, setLoading] = useState(true);
    const { token } = theme.useToken();

    useEffect(() => {
        const fetchSiteMeta = async () => {
            try {
                const query = `*[_type == "siteMeta"][0]{
                    paypalLink,
                    donationImage,
                    aboutBannerTitle,
                    aboutBannerContent,
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

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '100px 20px' }}>
                <Spin size="large" />
            </div>
        );
    }

    const bgImageUrl = data?.donationImage ? urlFor(data.donationImage).width(1600).url() : '';

    return (
        <>
            <Section bgImage={bgImageUrl} overlayColor={token.colorPrimaryTextActive}>
                <Title coro level={1} ls sx={{ color: 'white', opacity: 0.8 }}>
                    {data?.aboutBannerTitle?.toUpperCase()}
                </Title>
                <Text center mt={60} mb={60} sx={{ maxWidth: 600, color: 'white', opacity: 0.8 }}>
                    {data?.aboutBannerContent}
                </Text>
            </Section>
            <Section>
                <></>
                {/* <Text center></Text> */}
            </Section>
        </>
    );
};

export default About;
