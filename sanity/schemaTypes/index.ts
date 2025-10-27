import { type SchemaTypeDefinition } from 'sanity';
import news from './content';
import slideshow from './slideshow';
import schedules from './schedules';
import siteMeta from './siteMeta';

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [news, slideshow, schedules, siteMeta],
};
