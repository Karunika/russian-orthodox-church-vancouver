import { defineType } from 'sanity';

export default defineType({
    name: 'news',
    title: 'News',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [{ type: 'block' }],
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            description: 'Select which content section this belongs to',
            options: {
                list: [
                    { title: 'News', value: 'news' },
                    { title: 'Library', value: 'library' },
                    { title: 'Prayer Life', value: 'prayerLife' },
                ],
                layout: 'radio', // renders as radio buttons
            },
            validation: (Rule) => Rule.required(),
        },
    ],
});
