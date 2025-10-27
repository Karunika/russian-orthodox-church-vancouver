'use client';

import { useEffect, useState } from 'react';
import { Button, Spin, theme } from 'antd';
import { client, urlFor } from '@/lib/sanity';
import Section from './Section';

import { Title, Text } from './Text';

interface SiteMeta {
    paypalLink?: string;
    donationImage?: any;
}

const DonationPanel = () => {
    const [data, setData] = useState<SiteMeta | null>(null);
    const [loading, setLoading] = useState(true);
    const { token } = theme.useToken();

    useEffect(() => {
        const fetchSiteMeta = async () => {
            try {
                const query = `*[_type == "siteMeta"][0]{ paypalLink, donationImage }`;
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
        <Section bgImage={bgImageUrl} overlayColor={token.colorPrimaryTextActive}>
            <Title coro level={4} ls sx={{ color: token.colorPrimaryBgHover }}>
                SUPPORT OUR PARISH
            </Title>
            <Text center mt={60} mb={60} sx={{ maxWidth: 500, color: token.colorPrimaryBgHover }}>
                Your donations help us to continue our work in the community and spread the love and faith of Christ.
            </Text>
            <Button
                type="primary"
                variant="filled"
                size="large"
                disabled={!data?.paypalLink}
                onClick={() => {
                    if (data?.paypalLink) window.open(data.paypalLink, '_blank');
                }}
                style={{ backgroundColor: token.colorPrimaryHover, borderRadius: 0 }}
            >
                <Text sx={{ color: token.colorPrimaryBg }}>DONATE NOW</Text>
            </Button>
        </Section>
    );
};

export default DonationPanel;
