'use client';

import { CSSProperties, useEffect, useState } from 'react';
import { Carousel as AntCarousel, Spin, Typography, Flex, Button } from 'antd';
import { client, urlFor } from '@/lib/sanity';

import { Text, Title } from './Text';

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
    maxWidth: '80%',
};

function capitalizeFirstLetter(val: string): string {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

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
            <Flex>
                <Spin size="large" />
            </Flex>
        );
    }

    if (slides.length === 0) {
        return <div className="flex items-center justify-center h-screen text-gray-500">No slides available.</div>;
    }

    return (
        <AntCarousel autoplay autoplaySpeed={5000} fade arrows>
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

                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background:
                                    'linear-gradient(to bottom right, rgba(120, 50, 50, 0.9), rgba(40, 117, 109, 0.5))',
                                zIndex: 1,
                            }}
                        />

                        <div style={{ ...textOverlayStyle, zIndex: 2 }}>
                            <Title
                                coro
                                center
                                level={1}
                                sx={{
                                    color: '#ffffffee',
                                    lineHeight: 1.4,
                                    fontSize: '48px',
                                }}
                            >
                                {slide.title}
                            </Title>
                            {slide.link && (
                                <Button
                                    color="default"
                                    type="primary"
                                    variant="outlined"
                                    size="large"
                                    onClick={() => {
                                        window.open(slide.link, '_blank');
                                    }}
                                    style={{
                                        borderRadius: 0,
                                        marginTop: 40,
                                        background: 'transparent',
                                        color: 'white',
                                        padding: 30,
                                    }}
                                >
                                    LEARN MORE
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </AntCarousel>
    );
};

export default Carousel;
