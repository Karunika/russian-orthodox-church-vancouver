'use client';

import { useEffect, useState } from 'react';
import { theme, Row, Col, Card, Button, Divider, Flex } from 'antd';
import Link from 'next/link';
import { client, urlFor } from '@/lib/sanity';
import Section from './Section';
import { Title, Text } from './Text';

interface NewsItem {
    _id: string;
    title: string;
    slug: { current: string };
    mainImage?: any;
    body?: any;
}

const Welcome = () => {
    const [news, setNews] = useState<NewsItem[]>([]);

    const { token } = theme.useToken();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const query = `*[_type == "news"] | order(publishedAt desc)[0...3]{
                    _id,
                    title,
                    slug,
                    mainImage,
                    body
                }`;
                const data = await client.fetch(query);
                setNews(data);
            } catch (err) {
                console.error('Error fetching news:', err);
            }
        };
        fetchNews();
    }, []);

    return (
        <Section>
            <Title primary ls coro>
                LATEST NEWS
            </Title>
            <Text mt={20} ls>
                Stay up to date with the latest updates, parish announcements, and community events.
            </Text>

            <Divider style={{ borderColor: 'transparent', margin: '40px 0' }} />

            <Flex justify="center" gap={40} style={{ flexGrow: 1 }}>
                {news.map((item) => (
                    <Card
                        key={item._id}
                        hoverable
                        cover={
                            item?.mainImage && (
                                <img
                                    alt={item.title}
                                    src={urlFor(item.mainImage).width(800).height(500).url()}
                                    style={{
                                        width: '100%',
                                        height: 200,
                                        objectFit: 'cover',
                                        borderRadius: 0,
                                    }}
                                />
                            )
                        }
                        style={{
                            boxShadow: 'none',
                            backgroundColor: token.colorPrimaryBg,
                            borderRadius: 0,
                            flexBasis: 0,
                            flexGrow: 1,
                            zIndex: 3,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                        styles={{
                            body: {
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                            },
                        }}
                    >
                        <Flex vertical align="center" justify="space-between" style={{ flexGrow: 1 }}>
                            <Title coro ls level={5} center>
                                {item.title}
                            </Title>

                            <Divider />

                            <Text primary center sx={{ flexGrow: 1 }}>
                                {item.body?.[0]?.children?.[0]?.text.slice(0, item.mainImage ? 200 : 500) + '...'}
                            </Text>

                            <Link href={`/news/${item.slug.current}`} style={{ marginTop: 24 }}>
                                <Button type="link" style={{ color: '#bba4a0', padding: 0 }}>
                                    <Text>READ MORE</Text>
                                </Button>
                            </Link>
                        </Flex>
                    </Card>
                ))}
            </Flex>
        </Section>
    );
};

export default Welcome;
