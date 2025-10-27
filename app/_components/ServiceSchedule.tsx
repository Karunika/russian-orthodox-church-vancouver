'use client';

import { useEffect, useState } from 'react';
import { theme, Card, Divider, Flex } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Section from './Section';
import { client } from '@/lib/sanity';
import { Title, Text } from './Text';

interface ScheduleItem {
    _id: string;
    title: string;
    dayOfWeek?: string;
    date?: string;
    serviceName?: string;
    description?: string;
    timings?: { label?: string; time?: string }[];
}

const VerticalFlexCard = ({ children }: { children: React.ReactNode }) => {
    return (
        <Card
            variant="borderless"
            style={{
                background: 'transparent',
                boxShadow: 'none',
                textAlign: 'center',
            }}
        >
            <Flex vertical justify="flex-start" align="center" style={{ height: '100%' }}>
                {children}
            </Flex>
        </Card>
    );
};

const ServiceSchedule = () => {
    const [schedules, setSchedules] = useState<ScheduleItem[]>([]);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const query = `*[_type == "schedule"] | order(date asc){
                    _id,
                    title,
                    dayOfWeek,
                    date,
                    serviceName,
                    description,
                    timings
                }`;
                const data = await client.fetch(query);
                setSchedules(data);
            } catch (error) {
                console.error('Error fetching schedule:', error);
            }
        };
        fetchSchedule();
    }, []);

    const { token } = theme.useToken();

    return (
        <Section bgColor={token.colorPrimaryBg}>
            <Title primary ls coro>
                SERVICE SCHEDULE
            </Title>

            <Text mt={20} ls>
                All services are in English.
            </Text>

            <Divider style={{ borderColor: 'transparent', margin: '32px 0' }} />

            <Flex wrap justify="center" align="stretch" gap={32}>
                {schedules.map((item) => {
                    const formattedDate = item.date
                        ? new Date(item.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'short',
                              day: 'numeric',
                          })
                        : item.dayOfWeek || '';

                    return (
                        <VerticalFlexCard key={item._id}>
                            <Title primary coro ls level={4}>
                                {item.title}
                            </Title>
                            {/* {item.serviceName && (
                                <Text primary ls sx={{ fontWeight: 500 }}>
                                    {item.serviceName}
                                </Text>
                            )} */}
                            <Text primary coro ls>
                                {formattedDate}
                            </Text>
                            {/* {item.timings?.length ? (
                                <div style={{ marginTop: 12 }}>
                                    {item.timings.map((t, idx) => (
                                        <Text key={idx}>
                                            {t.label ? `${t.label}: ` : ''}
                                            {t.time}
                                        </Text>
                                    ))}
                                </div>
                            ) : null} */}
                            {item.description && <Text>{item.description}</Text>}
                        </VerticalFlexCard>
                    );
                })}
            </Flex>
        </Section>
    );
};

export default ServiceSchedule;
