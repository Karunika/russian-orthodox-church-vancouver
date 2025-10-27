'use client';

import { CSSProperties, useEffect, useState } from 'react';
import { Carousel as AntCarousel, Spin, Typography } from 'antd';
import { client, urlFor } from '@/lib/sanity';

const { Title, Paragraph } = Typography;

interface Slide {
    _id: string;
    title: string;
    subtitle?: string;
    image: any;
    link?: string;
}

const contentStyle: CSSProperties = {
    height: '100vh',
    color: '#fff',
    textAlign: 'center',
    background: '#364d79',
    position: 'relative',
    overflow: 'hidden',
};

const textOverlayStyle: CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#fff',
    textShadow: '0 2px 8px rgba(0,0,0,0.5)',
    maxWidth: '80%',
};

const Carousel: React.FC = () => {
    const [slides, setSlides] = useState<Slide[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const query = `*[_type == "slideshow" && active == true] | order(order asc) {
                    _id,
                    title,
                    subtitle,
                    image,
                    link
                }`;
                const data = await client.fetch(query);
                setSlides(data);
            } catch (err) {
                console.error('Error fetching slides:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSlides();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (slides.length === 0) {
        return <div className="flex items-center justify-center h-screen text-gray-500">No slides available.</div>;
    }

    return (
        <AntCarousel autoplay autoplaySpeed={5000} fade>
            {slides.map((slide) => (
                <div key={slide._id}>
                    <div style={contentStyle}>
                        {slide.image && (
                            <img
                                src={urlFor(slide.image).width(1920).height(1080).url()}
                                alt={slide.title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    zIndex: 0,
                                }}
                            />
                        )}
                        <div style={textOverlayStyle}>
                            <Title level={1} style={{ color: 'white' }}>
                                {slide.title}
                            </Title>
                            {slide.subtitle && (
                                <Paragraph style={{ color: 'white', fontSize: '1.2rem' }}>{slide.subtitle}</Paragraph>
                            )}
                            {slide.link && (
                                <a
                                    href={slide.link}
                                    style={{
                                        display: 'inline-block',
                                        marginTop: '1rem',
                                        padding: '0.5rem 1.5rem',
                                        backgroundColor: '#1890ff',
                                        color: 'white',
                                        borderRadius: '6px',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Learn More
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </AntCarousel>
    );
};

export default Carousel;
