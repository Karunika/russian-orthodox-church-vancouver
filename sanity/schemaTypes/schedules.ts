import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'schedule',
    title: 'Schedule',
    type: 'document',
    fields: [
        defineField({
            name: 'date',
            title: 'Date',
            type: 'datetime',
            description: 'The date of the service or event (includes month, day, year)',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'dayOfWeek',
            title: 'Day of the Week',
            type: 'string',
            description: 'Optional manual label (e.g. Sunday, Monday)',
        }),
        defineField({
            name: 'title',
            title: 'Title / Feast',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'serviceName',
            title: 'Service Name',
            type: 'string',
            description: 'Example: Divine Liturgy, Vigil, Matins, General Pannykhida, Moleben, etc.',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
            description: 'Optional short description or notes about the event',
        }),
        defineField({
            name: 'timings',
            title: 'Timings',
            type: 'array',
            of: [
                defineField({
                    name: 'time',
                    title: 'Time',
                    type: 'string',
                    validation: (Rule) =>
                        Rule.regex(
                            /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i,
                            'Time must be in 12-hour format (e.g., 9:30 AM)'
                        ).required(),
                }),
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            date: 'date',
            serviceName: 'serviceName',
        },
        prepare({ title, date, serviceName }) {
            const formattedDate = date ? new Date(date).toLocaleDateString() : 'No date';
            return {
                title: `${title || 'Untitled'}${serviceName ? ' — ' + serviceName : ''}`,
                subtitle: formattedDate,
            };
        },
    },
});
