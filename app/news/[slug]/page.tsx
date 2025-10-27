import { client, urlFor } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { Card } from 'antd';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';

interface NewsItem {
    _id: string;
    title: string;
    mainImage?: any;
    body?: any;
}

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
    const query = `*[_type == "news" && slug.current == $slug][0]{
        _id,
        title,
        mainImage,
        body
    }`;
    const newsItem: NewsItem = await client.fetch(query, { slug: params.slug });

    if (!newsItem) {
        return <div>News article not found.</div>;
    }

    return (
        <div style={{ maxWidth: 800, margin: '60px auto', padding: '0 20px' }}>
            <Card bordered={false}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>
                    {newsItem.title}
                </Title>
                {newsItem.mainImage && (
                    <img
                        src={urlFor(newsItem.mainImage).width(1000).url()}
                        alt={newsItem.title}
                        style={{ width: '100%', borderRadius: 8, marginBottom: 24 }}
                    />
                )}
                <Paragraph>
                    <PortableText value={newsItem.body} />
                </Paragraph>
            </Card>
        </div>
    );
}
