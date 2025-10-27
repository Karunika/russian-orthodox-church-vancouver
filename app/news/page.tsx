'use client';

import { client, urlFor } from '@/lib/sanity';
import { useEffect, useState } from 'react';
import Section from '../_components/Section';
import { Card, Button, Divider, Flex, Spin, theme } from 'antd';
import { Title, Text } from '../_components/Text';
import Masonry from 'react-masonry-css';
import Link from 'next/link';

interface NewsItem {
    _id: string;
    title: string;
    slug: { current: string };
    mainImage?: any;
    body?: any;
    category?: 'news' | 'library' | 'prayerLife';
}

const NewsPage = () => {
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const { token } = theme.useToken();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const query = `*[_type == "news"] | order(publishedAt desc){
                    _id,
                    title,
                    slug,
                    mainImage,
                    body
                }`;
                const data = await client.fetch(query);
                setNewsItems(data);
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <Section>
                <Spin size="large" />
            </Section>
        );
    }

    const breakpointColumnsObj = {
        default: 3,
        1100: 2,
        700: 1,
    };

    return (
        <Section>
            <Title level={2} coro ls mb={48}>
                NEWS & UPDATES
            </Title>

            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {newsItems.map((item) => (
                    <Card
                        key={item._id}
                        hoverable
                        cover={
                            item.mainImage && (
                                <img
                                    alt={item.title}
                                    src={urlFor(item.mainImage).width(800).height(500).url()}
                                    style={{
                                        width: '100%',
                                        height: 200,
                                        objectFit: 'cover',
                                    }}
                                />
                            )
                        }
                        style={{
                            boxShadow: 'none',
                            backgroundColor: token.colorPrimaryBg,
                            borderRadius: 0,
                            marginBottom: 24,
                        }}
                    >
                        <Flex vertical align="center" justify="space-between" style={{ minHeight: 220 }}>
                            <Flex vertical align="center">
                                <Title coro ls level={5} mb={8}>
                                    {item.title}
                                </Title>

                                <Divider style={{ margin: '12px 0' }} />

                                <Text primary>
                                    {item.body?.[0]?.children?.[0]?.text?.slice(0, 120) ?? 'Read more...'}
                                </Text>
                            </Flex>
                            <Link href={`/news/${item.slug.current}`}>
                                <Button type="link" style={{ color: '#bba4a0', padding: 0, marginTop: 12 }}>
                                    <Text>READ MORE</Text>
                                </Button>
                            </Link>
                        </Flex>
                    </Card>
                ))}
            </Masonry>

            <style jsx global>{`
                .my-masonry-grid {
                    display: flex;
                    margin-left: -24px; /* gutter size offset */
                    width: auto;
                }
                .my-masonry-grid_column {
                    padding-left: 24px; /* gutter size */
                    background-clip: padding-box;
                }
            `}</style>
        </Section>
    );
};

export default NewsPage;
