import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'slideshow',
    title: 'Slideshow',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Slide Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
            description: 'Optional secondary text for the slide',
        }),
        defineField({
            name: 'image',
            title: 'Slide Image',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'link',
            title: 'Link (optional)',
            type: 'url',
            description: 'Optional URL to navigate when the slide is clicked',
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Use this to control the order of slides in the carousel',
        }),
        defineField({
            name: 'active',
            title: 'Active',
            type: 'boolean',
            initialValue: true,
            description: 'Uncheck to hide this slide from the live site',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image',
            subtitle: 'subtitle',
        },
    },
});
