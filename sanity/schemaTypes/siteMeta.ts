import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'siteMeta',
    title: 'Site Metadata',
    type: 'document',
    fields: [
        defineField({
            name: 'parishRector',
            title: 'Parish Rector',
            type: 'string',
            description: 'Name and title of the parish rector (e.g., Very Reverend Archpriest Serge Overt)',
            validation: (Rule) => Rule.required(),
            initialValue: 'Very Reverend Archpriest Serge Overt',
        }),
        defineField({
            name: 'telephone',
            title: 'Telephone',
            type: 'string',
            description: 'Primary contact number of the parish',
            validation: (Rule) => Rule.required(),
            initialValue: '(604) 254 2571',
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            description: 'Email address of the parish',
            validation: (Rule) => Rule.required(),
            initialValue: 'batushka@russianorthodoxchurch.ca',
        }),
        defineField({
            name: 'paypalLink',
            title: 'PayPal Link',
            type: 'url',
            description: 'Optional link to make donations via PayPal',
            validation: (Rule) => Rule.required(),
            initialValue: 'https://example.com/',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
            description: 'Physical address of the parish',
            validation: (Rule) => Rule.required(),
            initialValue: '710 CAMPBELL AVE, VANCOUVER, BC, CANADA',
        }),
        defineField({
            name: 'locationFallbackLink',
            title: 'Fallback Map Link',
            type: 'url',
            description: 'Optional Google Maps or external link to parish location',
            initialValue: 'https://example.com/',
        }),
        defineField({
            name: 'divineSchedule',
            title: 'Divine Services Schedule',
            type: 'array',
            description: 'Array of general schedule messages for Divine Services',
            of: [
                defineField({
                    name: 'scheduleItem',
                    title: 'Schedule Item',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Title',
                            type: 'string',
                            description: 'Optional title of the service',
                        }),
                        defineField({
                            name: 'description',
                            title: 'Description',
                            type: 'text',
                            rows: 3,
                            description: 'Optional description of the service or notes',
                        }),
                        defineField({
                            name: 'weekdays',
                            title: 'Weekdays',
                            type: 'array',
                            of: [{ type: 'string' }],
                            description: 'Select weekdays for this service',
                            validation: (Rule) =>
                                Rule.min(1)
                                    .error('At least one weekday must be selected')
                                    .custom((arr) => {
                                        const validDays = [
                                            'Monday',
                                            'Tuesday',
                                            'Wednesday',
                                            'Thursday',
                                            'Friday',
                                            'Saturday',
                                            'Sunday',
                                        ];
                                        return arr?.every((day) => validDays.includes(day as any as string))
                                            ? true
                                            : 'Invalid weekday';
                                    }),
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
                        defineField({
                            name: 'exceptions',
                            title: 'Exceptions',
                            type: 'text',
                            rows: 2,
                            description: 'Optional note for exceptions (e.g., holidays, special feast days)',
                        }),
                    ],
                }),
            ],
            initialValue: [
                {
                    title: 'Divine Liturgy',
                    weekdays: ['Sunday'],
                    timings: ['10:00 AM'],
                    description: 'On Sundays and Feast-days Divine Liturgy is at 10.00 a.m.',
                },
                {
                    title: 'Vigil Service',
                    weekdays: ['Saturday'],
                    timings: ['6:00 PM'],
                    description: 'On Saturday evenings and the eves of feasts, the evening Vigil service is at 6 p.m.',
                },
            ],
        }),
        defineField({
            name: 'churchSchool',
            title: 'Church School',
            type: 'text',
            description:
                'Description of parish church school (e.g., Instruction in the Orthodox faith for parish children takes place on Sundays after Divine Liturgy.)',
            rows: 3,
        }),
        defineField({
            name: 'links',
            title: 'Links',
            type: 'array',
            description: 'Array of useful links for display in the site footer or elsewhere',
            of: [
                defineField({
                    name: 'linkItem',
                    title: 'Link Item',
                    type: 'object',
                    fields: [
                        { name: 'displayText', title: 'Display Text', type: 'string' },
                        { name: 'url', title: 'URL', type: 'url' },
                    ],
                }),
            ],
            initialValue: [
                {
                    displayText: 'Russian Orthodox Church – Outside Russia',
                    url: 'https://russianorthodoxchurch.ws/synod/indexeng.htm#gsc.tab=0',
                },
                {
                    displayText: 'Russian Orthodox Church – Moscow Patriarchate',
                    url: 'https://mospat.ru/en/',
                },
                {
                    displayText: 'Assembly of Canonical Orthodox Bishops',
                    url: 'https://www.assemblyofbishops.org/',
                },
                {
                    displayText: 'Russian Orthodox Diocese of Montreal and Canada',
                    url: 'https://mcdiocese.com/en/',
                },
                {
                    displayText: 'Online directory of Orthodoxy in North America',
                    url: 'http://orthodoxyinamerica.org/',
                },
                {
                    displayText: 'Orthodox Information Center',
                    url: 'http://orthodoxinfo.com/',
                },
                {
                    displayText: 'Orthodox Northwest Bulletin Board',
                    url: 'https://orthodoxnorthwest.wordpress.com/',
                },
                {
                    displayText: 'St. Nicholas Russian Orthodox Church, McKinney (Dallas area) Texas',
                    url: 'https://www.orthodox.net/',
                },
            ],
        }),
        defineField({
            name: 'donationImage',
            title: 'Donation Image',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'aboutBannerTitle',
            title: 'About Banner Title',
            type: 'string',
            description: 'The title that shows on the banner of the About Us page',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'aboutBannerContent',
            title: 'About Banner Content',
            type: 'string',
            description: 'The content that shows on the banner of the About Us page',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'aboutBody',
            title: 'About Body',
            type: 'array',
            of: [{ type: 'block' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'contactBannerTitle',
            title: 'Contact Banner Title',
            type: 'string',
            description: 'The title that shows on the banner of the Contact Us page',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'contactBannerContent',
            title: 'Contact Banner Content',
            type: 'string',
            description: 'The content that shows on the banner of the Contact Us page',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'parishRector',
            subtitle: 'location',
        },
    },
    // __experimental_actions: ['update' /* 'create', 'delete' */],
});
