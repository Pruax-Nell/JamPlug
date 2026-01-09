// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';
import { SKATE_DISCIPLINES, BLOG_CATEGORY, SKILL_LEVEL, EVENT_TYPE, GROUPED_COUNTRIES, POST_STATUS } from './src/constants'

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
          // TODO if this fails, remove defaultValue or fix somehow
        }),
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
          options:[
            { label: '-- Not Specified --', value: '' }, 
            ...SKATE_DISCIPLINES 
          ],
          defaultValue: '',
        }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: '/',
          publicPath: './',
        }),

        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
          }},
        }),
      },

    }),

    // ------------------------------------------------------- EVENTS
    events: collection ({
      label: 'Events',
      slugField: 'eventName',
      path: 'src/content/events/*/',
      format: { contentField: 'content'},
      schema: {
      // CMS ADMIN FIELDS
        status: fields.select({
          label: 'Status', 
          options: POST_STATUS,
          defaultValue: 'draft',
        }),
        published: fields.date({ label: 'Published Date' }),
        isFeatured: fields.checkbox({ label: 'Is Featured' }),
      // Main Info
        eventName: fields.slug({ name: { label: 'Event Name' } }),
        subheading: fields.text({ label: 'Sub Heading'}),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
        startDate: fields.date({ label: 'Start Date' }),
        endDate: fields.date({ label: 'End Date' }),
    // Secondary key info
        eventPoster: fields.image({
          label: 'Event Poster',
          directory: '/',
          publicPath: '/',
        }),
        country: fields.select({
          label: 'Country',
          options: GROUPED_COUNTRIES,
          defaultValue: 'england',
        }),
        townCity: fields.text({ 
          label: 'Town / City',
          description: 'e.g. London, Bristol, Lille'
        }),
        eventType: fields.select({ 
          label:'Event Type',
          options: [
            { label: '-- Not Specified --', value: '' }, 
            ...EVENT_TYPE 
          ],
          defaultValue: '',
        }),
        skateDiscipline: fields.select({ 
          label: 'Skate Discipline',
          options: [
            {label: '-- Not Specified --', value: ''},
            ...SKATE_DISCIPLINES
          ],
          defaultValue: '', 
        }),
        skilllevel: fields.select({
          label: 'Level requirement',
          options:[
            {label: '-- Not Specified --', value: ''},
            ...SKILL_LEVEL
          ],
          defaultValue: '', 
        }),
        // participationlevel: fields.select({
        //   label: 'Participation level',
        //   options: PARTICIPATION_LEVEL, 
        //   defaultValue: 'amateur',
        // }),
        minAge: fields.text({ label: 'Minimum Age' }),
        maxAge: fields.text({ label: 'Maximum Age' }),

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
    // Bonus info - option to add multiple lines ideal
        eventLink: fields.url({ label: 'Event Link', }),
        ticketLink: fields.url({ label: 'Ticket Link' }),
        organiser: fields.text({ label: 'Organiser'}),
        orgLink: fields.url({ label: 'Organisers link'}),
        host: fields.text({ label: 'Event Host' }),
        hostLink: fields.url({ label: 'host link'}),
        coach: fields.text({ label: 'Coach' }),
        coachLink: fields.url({ label: 'coach link'}),
        dj: fields.text({ label: 'DJ' }),
        djLink: fields.url({ label: 'dj link'}),
        
        rink: fields.text({ label: 'Featured Rink' }),
        venueAddress: fields.text({ label: 'Address' }),
        mapCoordinates: fields.text({ label: 'Map Coordinates' }),

        offSkates: fields.checkbox({ label: 'Non Skating Event?'}),
        repetition: fields.text({ label: 'Repetition' }),
      // TEXT BODY
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
            directory: '/',
            publicPath: './',
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