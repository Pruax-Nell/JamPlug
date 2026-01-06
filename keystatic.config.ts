// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';
import { SKATE_DISCIPLINES, BLOG_CATEGORY, SKILL_LEVEL, PARTICIPATION_LEVEL, EVENT_TYPE, GROUPED_COUNTRIES, POST_STATUS } from './src/constants'

// Since you defined startTime and endTime as fields.object in Keystatic, we match that structure in Zod. When you want to display it in your Astro component, you would use: {event.data.startTime.hour}:{event.data.startTime.minute}.
 
export default config({
  storage: {
    kind: 'local',
    // type: 'local',
  },
  collections: {

    // ---------------------------------------------------------- BLOG
    blog: collection({
      label: 'blog',
      slugField: 'title',
      path: 'src/content/blog/*/',
      format: { contentField: 'content'},
      schema: {
        // needs to match astro config
        title: fields.slug({ name: { label: 'Title' } }),
        subtitle: fields.text({ label: 'Sub-Title', description: 'e.g.tag lines or under/second title (hint:...after the colon)'}),
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
          label: 'Blog Category',
          options: SKATE_DISCIPLINES,
          defaultValue: 'rhythm-dance',
        }),

        status: fields.select({
          label: 'Status', 
          options: POST_STATUS,
          defaultValue: 'draft',
        }),
        published: fields.date({ 
          label: 'Published Date', 
          defaultValue: new Date().toISOString().split('T')[0], 
          validation: { isRequired: true }
          // TODO if this fails, remove defaultValue or fix somehow
        }),
        
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'src/content/blog/*/_images',
          publicPath: './_images/',
        }),
        gallery: fields.array(
          fields.object({
            file: fields.image({
              label: 'Image File',
              directory: 'src/content/blog/*/_images',
              publicPath: './_images/',
            }),
            alt: fields.text({ 
              label: 'Alt Text',
              defaultValue: 'Blog gallery image' 
            }),
          }),
          {
            label: 'Image Gallery',
            itemLabel: (props) => props.fields.alt.value || 'Gallery Image',
          }
        ),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
            directory: 'src/content/blog/*/_images',
            publicPath: './_images/',
          }},
        }),
      },

    }),

    // ------------------------------------------------------- EVENTS
    events: collection ({
      label: 'Events',
      slugField: 'eventName',
      path: 'src/content/events/*',
      format: { contentField: 'content'},
      schema: {

        eventName: fields.slug({ name: { label: 'Event Name' } }),
        subheading: fields.text({ label: 'Sub Heading'}),

        startDate: fields.date({ label: 'Start Date' }),
        endDate: fields.date({ label: 'End Date' }),
        
        status: fields.select({
          label: 'Status', 
          options: POST_STATUS,
           defaultValue: 'draft',
         }),
        published: fields.date({ label: 'Published Date' }),
        isFeatured: fields.checkbox({ label: 'Is Featured' }),

        country: fields.select({
          label: 'Country',
          options: GROUPED_COUNTRIES,
          defaultValue: 'england',
        }),
        townCity: fields.text({ 
          label: 'Town / City',
          description: 'e.g. London, Bristol, Lille'
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
        
        eventType: fields.select({ 
          label: 'Event Type',
          options: EVENT_TYPE, 
          defaultValue: 'day-skate', 
        }),
        skateDiscipline: fields.select({ 
          label: 'Skate Discipline',
          options: SKATE_DISCIPLINES,
          defaultValue: 'rhythm-dance', 
        }),

        eventPoster: fields.image({
          label: 'Event Poster',
          directory: 'src/content/events/*/_images',
          publicPath: './_images/',
        }),
        eventgallery: fields.array(
          fields.object({
            file: fields.image({
              label: 'Image File',
              directory: 'src/content/events/*/_images',
              publicPath: './_images/',
            }),
            alt: fields.text({ 
              label: 'Alt Text',
              defaultValue: 'Blog gallery image' 
            }),
          }),
          {
            label: 'Image Gallery',
            itemLabel: (props) => props.fields.alt.value || 'Gallery Image',
          }
        ),

        startTime: fields.object({ 
          hour: fields.select({
            label: 'Hour',
            options: Array.from({ length: 24 }, (_, i) => ({
              label: i.toString().padStart(2, '0'),
              value: i.toString().padStart(2, '0'),
            })),
            defaultValue: '12',
          }),
          minute: fields.select({
            label: 'Minute',
            options: ['00', '15', '30', '45'].map(m => ({ label: m, value: m })),
            defaultValue: '00',
          }),
        }),
        endTime: fields.object({
          hour: fields.select({
            label: 'Hour',
            options: Array.from({ length: 24 }, (_, i) => ({
              label: i.toString().padStart(2, '0'),
              value: i.toString().padStart(2, '0'),
            })),
            defaultValue: '12',
          }),
          minute: fields.select({
            label: 'Minute',
            options: ['00', '15', '30', '45'].map(m => ({ label: m, value: m })),
            defaultValue: '00',
          }), 
        }),
        
        eventLink: fields.url({ label: 'Event Link', }),
        ticketLink: fields.url({ label: 'Ticket Link' }),
        organiser:  fields.text({ label: 'Organiser'}),
        orgLink: fields.url({ label: 'Organisers link'}),
        host: fields.text({ label: 'Event Host' }),
        hostLink: fields.url({ label: 'host link'}),
        coach: fields.text({ label: 'Coach' }),
        coachLink: fields.url({ label: 'coach link'}),
        dj: fields.text({ label: 'DJ' }),
        djLink: fields.url({ label: 'dj link'}),
        
        featuredRink: fields.text({ label: 'Featured Rink' }),
        venueAddress: fields.text({ label: 'Address' }),
        mapCoordinates: fields.text({ label: 'Map Coordinates' }),

        repetition: fields.text({ label: 'Repetition' }),
        skilllevel: fields.select({
          label: 'Level requirement',
          options:SKILL_LEVEL, 
          defaultValue: 'competent',
        }),
        participationlevel: fields.select({
          label: 'Participation level',
          options: PARTICIPATION_LEVEL, 
          defaultValue: 'amateur',
        }),
        offSkates: fields.checkbox({ 
          label: 'Non Skating Event?', 
        }),
        minAge: fields.text({ label: 'Minimum Age' }),
        maxAge: fields.text({ label: 'Maximum Age' }),
        frequency: fields.text({ label: 'frequency' }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
            directory: 'src/content/events/*/_images',
            publicPath: './_images/',
          }},
        }),
      }
    }),
  }
});

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