// keystatic.config.ts
import React from 'react';
import { config, fields, collection, component} from '@keystatic/core';
import { ImagePreview } from '@components/previewImage';
import { EVENT_STATUS, SOCIAL_MEDIA, SKATE_DISCIPLINES, BLOG_CATEGORY, SKILL_LEVEL, EVENT_TYPE, POST_STATUS, FOOTWEAR_CHOICE, INDUSTRY_CAT, COMMUNITY_CAT, SKATE_VENUE, WHEEL_CHOICE } from './src/data/skate-constants';

import { slugify } from './src/function/stringHelper';
import { locationBlock, mapCoords, PersonListField, socials, createImageGroup } from './src/function/configBlocks/key-block';

// in future, a complete rebuild would be more efficient 
// singleton for long list data i.e. tags
// collection for per-page data


export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    
    posts: collection({
      label: 'Blog Post',
      slugField: 'title',
      path: 'src/content/posts/*',
      entryLayout: 'content',
      format: { contentField: 'content'},
      schema: {
        title: fields.slug({ name: { label: 'Title'} }),
        author: fields.object({
          profile: fields.relationship({
            label: 'Author Profile',
            collection: 'authors',
          }),
          isAnonymous: fields.checkbox({
            label: 'Post Anonymously',
            description: 'If checked, the author name and photo will be hidden from the public post.',
            defaultValue: false,
          }),
        }),
        subtitle: fields.text({ label: 'Sub-Title', description: 'e.g.tag lines or under/second title (hint:...after the colon)'}),
        // CMS ADMIN FIELDS 
        status: fields.select({
          label: 'Status', 
          options: POST_STATUS,
          defaultValue: 'draft',
        }),
        published: fields.date({ 
          label: 'Published Date', 
          defaultValue: new Date().toISOString().split('T')[0], 
          validation: { isRequired: true }
        }),
        isFeatured: fields.checkbox({ label: 'Featured Post', defaultValue: false }),
        updated: fields.date({ label: 'Last Updated' }),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
         blogCategory: fields.select({
          label: 'Blog Category',
          options: BLOG_CATEGORY,
          defaultValue: 'news',
        }),
        skateDiscipline: fields.select({
          label: 'Skate Discipline',
          options:[
            { label: '-- Not Specified --', value: '' }, 
            ...SKATE_DISCIPLINES 
          ],
          defaultValue: '',
        }),
         ...createImageGroup('Poster', 'posts', 'coverImage'),
        content: fields.markdoc ({ 
          label: 'Content',
          options: {
            image: {
              directory: 'src/content/images/posts',
              publicPath: '../images/posts/'
            }
          },
          
        }),
      }
    }),
    
    // ------------------------------------------------------- EVENTS
    events: collection ({
      label: 'Events',
      slugField: 'eventName',
      path: 'src/content/events/*/',
      entryLayout: 'content',
      format: { contentField: 'content'},
      schema: {
      // CMS ADMIN FIELDS
        status: fields.select({
          label: 'Status', 
          options: POST_STATUS,
          defaultValue: 'draft',
        }),
        isFeatured: fields.checkbox({ label: 'Is Featured' }),
        eventStatus: fields.select({ 
          label: 'Event Status',
          options: EVENT_STATUS,
          defaultValue: '',
        }),
      // Main Info
        eventName: fields.slug({ name: { label: 'Event Name', validation: { isRequired: true } } }),
        subheading: fields.text({ label: 'Sub Heading'}),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
        startDate: fields.date({ label: 'Start Date', validation: { isRequired: true } }),
        endDate: fields.date({ label: 'End Date' }),
    // Secondary key info
        location: locationBlock,
        townCity: fields.text({ 
          label: 'Town / City',
          description: 'e.g. London, Bristol, Lille',
          validation: { isRequired: true }
        }),
        eventType: fields.select({ 
          label:'Event Type',
          options: EVENT_TYPE,
          defaultValue: 'other',
          // validation: { isRequired: true },
        }),
        skateDiscipline: fields.select({ 
          label: 'Skate Discipline',
          options: SKATE_DISCIPLINES,
          defaultValue: 'other', 
        }),
        skillLevel: fields.select({
          label: 'Level requirement',
          options:[
            {label: '-- Optional Selection --', value: ''},
            ...SKILL_LEVEL
          ],
          defaultValue: '', 
        }),
        minAge: fields.text({ label: 'Minimum Age' }),
        maxAge: fields.text({ label: 'Maximum Age' }),
        ...createImageGroup('Poster', 'events', 'eventPoster'),
        ...createImageGroup('Poster', 'events', 'flyerImage1'),
        ...createImageGroup('Poster', 'events', 'flyerImage2'),
        ...createImageGroup('Poster', 'events', 'flyerImage3'),
        ...createImageGroup('Poster', 'events', 'flyerImage4'),
        ...createImageGroup('Poster', 'events', 'flyerImage5'),

        showStartTime: fields.checkbox({ label: 'Show Start time?', defaultValue: false }),
        startTime: fields.object({
          hour: fields.select({
            label: 'Hour',
            options: Array.from({ length: 24 }, (_, i) => ({
              label: i.toString().padStart(2, '0'),
              value: i.toString().padStart(2, '0'),
            })),
            defaultValue: '10',
          }),
          minute: fields.select({
            label: 'Minute',
            options: ['00', '15', '30', '45'].map(m => ({ label: m, value: m })),
            defaultValue: '00',
          }),
        }),
        showEndTime: fields.checkbox({ label: 'Show End time?', defaultValue: false }),
        endTime: fields.object({
          hour: fields.select({
            label: 'Hour',
            options: Array.from({ length: 24 }, (_, i) => ({
              label: i.toString().padStart(2, '0'),
              value: i.toString().padStart(2, '0'),
            })),
            defaultValue: '23',
          }),
          minute: fields.select({
            label: 'Minute',
            options: ['00', '15', '30', '45'].map(m => ({ label: m, value: m })),
            defaultValue: '00',
          }), 
        }),
    // Bonus info - option to add multiple lines ideal
        eventLink: fields.url({ label: 'Event Link', }),
        ticketLink: fields.array(
          fields.object({
            platform: fields.text({ label: 'Ticket Platform'}),
            directLink: fields.url({ label: 'URL', validation: { isRequired: false } }),
            disclaimer: fields.text({ label: 'Disclaimer'}),
          }),
          {
            label: 'Ticket Links'
          }
        ),
      organisers: PersonListField('Organiser', SOCIAL_MEDIA),
      djs: PersonListField('DJ', SOCIAL_MEDIA),
      coaches: PersonListField('Coach', SOCIAL_MEDIA),
      hosts: PersonListField('Host', SOCIAL_MEDIA),
      partners: PersonListField('Partner', SOCIAL_MEDIA),
        // TODO future - add rinkReference for business related. make optional! keep old 'rink'
        // then add conditional logic and fallback if rink = ' ' : rinkReference etc
        // or use node to automate cleanup
        rink: fields.text({ label: 'Featured Rink' }),
        venueAddress: fields.text({ label: 'Address' }),
        mapCoordinates: mapCoords,

        footwear: fields.select({ 
          label: 'Non Skating Event?', 
          options: FOOTWEAR_CHOICE, 
          defaultValue: 'skates'}),

        wheels: fields.select({ 
          label: 'What Wheels are Allowed?', 
          options: WHEEL_CHOICE, 
          defaultValue: 'all-skates'}),
          
      // TEXT BODY
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
            publicPath: './',
          }},
        }),
      }
    }),

    // -------------------------------------------- AUTHORS --------------|
    authors: collection({
      label: 'Authors',
      slugField: 'alias',
      path: 'src/content/authors/*/',
      format: { data: 'json' },
      schema: {
        legalName: fields.text({ label: 'Full Name'  }),
        alias: fields.slug({ 
          name: { 
            label: 'Author Alias',
            description: 'Public Name' 
          } 
        }),
        role: fields.text({ label: 'Role (e.g. Founder, Photographer)', defaultValue: 'Contributor' }),
        ...createImageGroup('Poster', 'events', 'headshot'),
        ...createImageGroup('Poster', 'events', 'skateImage'),
        bio: fields.text({ label: 'Short Bio', multiline: true }),
        socials: socials(SOCIAL_MEDIA),
      },
    }),

    // -------------------------------------------- RINKS --------------|
    rinks: collection({
      label: 'Skate Rinks',
      slugField: 'name',
      path: 'src/content/business/rinks/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Rink Name' } }),
        venue: fields.select ({
          label: 'Venue Type',
          options: SKATE_VENUE,
          defaultValue: 'rink',
        }),
        bio: fields.text({ label: 'Short Bio', multiline: true }),
        // change to imageGroup
        logo: fields.image({ 
          label: 'Rink Logo',
          directory: 'src/content/rinks/',
          publicPath: '../'
        }),
        location: locationBlock,
        founder: fields.text({ label: 'Founder'}),
        owner: fields.text({ label: 'Current Owner'}),
        socials: socials(SOCIAL_MEDIA),
      }

    }),
    
    // -------------------------------------------- COMMUNITY --------------|
    community: collection({
      label: 'Community and Groups',
      slugField: 'name',
      path: 'src/content/business/community/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Group Name' } }),
        bio: fields.text({ label: 'Short Bio', multiline: true }),
        // change to imageGroup
        logo: fields.image({ 
          label: 'Group Logo',
          directory: 'src/content/community/',
          publicPath: '../'
        }),
        location: locationBlock,
        founder: fields.text({ label: 'Founder'}),
        owner: fields.text({ label: 'Current Owner'}),
        socials: socials(SOCIAL_MEDIA),
      }

    }),
    
    // -------------------------------------------- INDUSTRY --------------|
    industry: collection({
      label: 'Industry Business',
      slugField: 'name',
      path: 'src/content/business/industry/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Business/Brand Name' } }),
        bio: fields.text({ label: 'Short Bio', multiline: true }),
        // change to imageGroup
        logo: fields.image({ 
          label: 'Group Logo',
          directory: 'src/content/industry/',
          publicPath: '../'
        }),
        location: locationBlock,
        founder: fields.text({ label: 'Founder'}),
        owner: fields.text({ label: 'Current Owner'}),
        socials: socials(SOCIAL_MEDIA),
      }

    }),
    



    // -------------------------------------------- blank --------------|
  }
});

// https://jankraus.net/2025/02/25/a-simple-guide-to-using-astro-with-keystatic/


// Data Type	|
// Keystatic Field (keystatic.config.ts)	--- Astro Zod Type (src/content/config.ts)
// 
// Simple Text|	
// fields.text({ label: '...' })	--- z.string()
// URL / Slug|	
// fields.slug({ name: { label: '...' } })	--- z.string()
// Date	|
// fields.date({ label: '...' })	--- z.coerce.date() (Converts string to JS Date)
// Yes/No	|
// fields.checkbox({ label: '...' })	--- z.boolean()
// Dropdown	|
// fields.select({ options: [...], ... })	--- z.enum(['val1', 'val2'])
// Tags  |
// List	fields.array(fields.text({ ... }))	--- z.array(z.string())
// Image	|
// fields.image({ ... })	--- ({ image }) => image() (Astro's image helper)
// Number	|
// fields.number({ label: '...' })	--- z.number()