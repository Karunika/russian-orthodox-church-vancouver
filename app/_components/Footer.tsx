'use client';

import { useState, useEffect } from 'react';
import { theme, Divider, Spin, Flex } from 'antd';
import { client } from '@/lib/sanity';
import Section from './Section';
import { Title, Text } from './Text';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';

const equalWidth = {
    flexBasis: 0,
    flexGrow: 1,
};

interface SiteMeta {
    parishRector?: string;
    telephone?: string;
    email?: string;
    location?: string;
    locationFallbackLink?: string;
    divineSchedule?: {
        title?: string;
        description?: string;
        weekdays?: string[];
        timings?: string[];
        exception?: string[];
    }[];
    links?: {
        displayText?: string;
        url?: string;
    }[];
}

const Footer = () => {
    const [data, setData] = useState<SiteMeta | null>(null);
    const [loading, setLoading] = useState(true);
    const { token } = theme.useToken();

    useEffect(() => {
        const fetchSiteMeta = async () => {
            try {
                const query = `*[_type == "siteMeta"][0]{
                    parishRector,
                    telephone,
                    email,
                    location,
                    locationFallbackLink,
                    divineSchedule,
                    links
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

    const color = token.colorPrimaryBgHover;

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '100px 20px' }}>
                <Spin size="large" />
            </div>
        );
    }
    return (
        <>
            <Section bgColor={token.colorPrimaryText}>
                <Flex gap={40}>
                    <Flex vertical style={equalWidth}>
                        <Title coro ls level={5} sx={{ color }} mb={60}>
                            DIVINE SERVICE SCHEDULE
                        </Title>
                        <Flex vertical gap={10}>
                            {data?.divineSchedule?.map((entity) => (
                                <Text ls sx={{ color }}>
                                    Every {entity?.weekdays?.join(', ')}
                                    <br />
                                    {entity?.timings?.join(', ')} - {entity?.title}
                                </Text>
                            ))}
                        </Flex>
                    </Flex>

                    <Divider type="vertical" style={{ borderColor: '#5a3e33', alignSelf: 'stretch', height: 260 }} />

                    <Flex vertical style={equalWidth}>
                        <Title coro ls level={5} sx={{ color }} mb={60}>
                            CONTACT
                        </Title>
                        <Flex vertical gap={10}>
                            <Text ls sx={{ color }}>
                                {' '}
                                Parish Rector: {data?.parishRector}
                            </Text>
                            <Text ls sx={{ color }}>
                                <PhoneOutlined /> {data?.telephone}
                            </Text>
                            <Text ls sx={{ color }}>
                                <MailOutlined /> {data?.email}
                            </Text>
                            <Text ls sx={{ color }}>
                                <EnvironmentOutlined /> {data?.location}
                            </Text>
                            {/* {data?.location} */}
                        </Flex>
                    </Flex>

                    {/* <Flex vertical style={equalWidth}>
                    <Title coro ls level={5} sx={{ color }} mb={60}>
                        LINKS
                    </Title>
                    <Flex vertical>
                        {data?.links?.map((link) => (
                            <Text sx={{ color }}>{link?.displayText}</Text>
                        ))}
                    </Flex>
                </Flex> */}
                </Flex>

                {/* <Divider style={{ borderColor: '#5a3e33', marginTop: 64, marginBottom: 24 }} />

                <Text sx={{ color: token.colorPrimaryBgHover, fontSize: 12 }}>
                    © 2025 - Holy Trinity Russian Orthodox Church | For site inquiries please contact{' '}
                    <a href="mailto:karunikatrip@gmail.com" style={{ color }}>
                        Freddie or Karunika
                    </a>
                </Text> */}
            </Section>
            <Flex align="center" justify="center" style={{ backgroundColor: token.colorPrimaryText }}>
                <Text mb={10} mt={10} sx={{ color, fontSize: 12 }}>
                    © 2025 - Holy Trinity Russian Orthodox Church | For site inquiries please contact{' '}
                    <a href="mailto:karunikatrip@gmail.com" style={{ color }}>
                        Freddie or Karunika
                    </a>
                </Text>
            </Flex>
        </>
    );
};

export default Footer;
