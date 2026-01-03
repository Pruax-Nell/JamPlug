// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';
 
export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    blogs: collection({
      label: 'blog',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content'},
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        status: fields.select({
          label: 'Status', 
          options: [
            {label: 'Draft', value: 'draft'},
            {label: 'Published', value: 'published'},
          ], defaultValue: 'draft',
         }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: (props) => props.value,
          }
        ),
        published: fields.date({ 
          label: 'Published Date', 
          defaultValue: new Date().toISOString().split('T')[0], 
          validation: { isRequired: true }
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'src/assets/images/blog',
          publicPath: '../../assets/images/blog/',
        }),
        insert1: fields.image({
          label: 'Insert Image 1',
          directory: 'src/assets/images/blog',
          publicPath: '../../assets/images/blog/',
        }),
        insert2: fields.image({
          label: 'Insert Image 2',
          directory: 'src/assets/images/blog',
          publicPath: '../../assets/images/blog/',
        }),
        insert3: fields.image({
          label: 'Insert Image 3',
          directory: 'src/assets/images/blog',
          publicPath: '../../assets/images/blog/',
        }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
            // Where the actual files are saved
            directory: 'src/assets/images/blog',
            // How the path is written inside your .mdoc file
            // "../../" moves up from src/content/blog to find src/assets
            publicPath: '../../assets/images/blog/',
          }},
        }),
      },

    }),

    events: collection ({
      label: 'Events',
      slugField: 'eventName',
      path: 'src/content/events/*',
      format: { contentField: 'content'},
      schema: {
        eventName: fields.slug({ name: { label: 'Event Name' } }),
        startDate: fields.date({ label: 'Start Date' }),
        endDate: fields.date({ label: 'End Date' }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: (props) => props.value,
          }
        ),
        status: fields.select({
          label: 'Status', 
          options: [
            {label: 'Draft', value: 'draft'},
            {label: 'Published', value: 'published'},
          ], defaultValue: 'draft',
         }),
        published: fields.date({ label: 'Published Date' }),

        country: fields.text({ label: 'Country'  }),
        townCity: fields.text({ label: 'Town / City'  }),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),

        isFeatured: fields.checkbox({ label: 'Is Featured' }),
        
        eventType: fields.select({ 
          label: 'event Type',
          options: [
            {label: 'Skate Party', value: 'skate party'},
            {label: 'Day Party', value: 'day party'},
            {label: 'Festival', value: 'festival'},
            {label: 'Workshop', value: 'workshop'},
            {label: 'Social', value: 'social'},
            {label: 'Weekend', value: 'weekend'},
            {label: 'Other', value: 'other'},
          ], defaultValue: 'skate party', 
        }),
        category: fields.select({ 
          label: 'event Type',
          options: [
            {label: 'Street', value: 'street'},
            {label: 'Jam / Dance', value: 'dance'},
            {label: 'Artistic', value: 'artistic'},
            {label: 'Ramps / Vert', value: 'ramps/vert'},
            {label: 'Speed', value: 'speed'},
            {label: 'Roller Hockey', value: 'hockey'},
            {label: 'All', value: 'all'},
            {label: 'Other', value: 'other'},
          ], defaultValue: 'all', 
        }),
        eventPoster: fields.image({
          label: 'Event Poster',
          directory: 'src/assets/images/event',
          publicPath: '../../assets/images/event/',
        }),
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
        
        eventLink: fields.url({ label: 'Event Link', validation: {isRequired: true}}),
        ticketLink: fields.url({ label: 'Ticket Link', validation: {isRequired: true}}),
        organiser:  fields.text({ label: 'Organiser'}),
        orgLink: fields.url({ label: 'Organisers link', validation: {isRequired: true} }),
        host: fields.text({ label: 'Event Host' }),
        hostLink: fields.url({ label: 'host link', validation: {isRequired: true} }),
        coach: fields.text({ label: 'Coach' }),
        coachLink: fields.url({ label: 'coach link', validation: {isRequired: true} }),
        dj: fields.text({ label: 'DJ' }),
        djLink: fields.url({ label: 'dj link', validation: {isRequired: true} }),
        eventImageOther: fields.image({
          label: 'Other images',
          directory: 'src/assets/images/event',
          publicPath: '../../assets/images/event/',
        }),
        
        featuredRink: fields.text({ label: 'Featured Rink' }),
        venueAddress: fields.text({ label: 'Address' }),
        mapCoordinates: fields.text({ label: 'Map Coordinates' }),

        repetition: fields.text({ label: 'Repetition' }),
        startlevel: fields.select({
          label: 'Level requirement',
          options: [
            {label: 'No experience', value: 'no experience'},
            {label: 'Beginner', value: 'beginner'},
            {label: 'Intermediate', value: 'intermediate'},
            {label: 'advance', value: 'advance'},
            {label: 'All', value: 'all'},
          ], defaultValue: 'all',
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
            // Where the actual files are saved
            directory: 'src/assets/images/event',
            // How the path is written inside your .mdoc file
            // "../../" moves up from src/content/blog to find src/assets
            publicPath: '../../assets/images/event/',
          }},
        }),
      }
    }),

    organisers: collection({
      label: 'Organisers',
      slugField: 'name',
      path: 'src/content/organisers/*',
      format: { contentField: 'content'},
      schema: {
        name: fields.text({ label: 'Name'}),
        portfolio: fields.slug({ name: {label: 'Portfolio'}}),

        socials: fields.array(
          fields.object({
            platform: fields.select({
              label: 'Platform',
              options: [
                { label: 'Instagram', value: 'instagram'},
                { label: 'TikTok', value: 'tiktok'},
                { label: 'Facebook', value: 'facebook'},
                { label: 'X / Twitter', value: 'x'},
                { label: 'Youtube', value: 'youtube'},
                { label: 'Website', value: 'website'},
                { label: 'Other', value: 'other'},
              ],
              defaultValue: 'website',
            }),
            url: fields.url({label: 'URL'}),
          }),
          {label: 'Social Links',
            itemLabel: (props) => {
              // Access the value of the 'platform' field inside the object
              return props.fields.platform.value ? `Social: ${props.fields.platform.value}` : 'New Link';
            },
          }),
        
        about: fields.text({
          label: 'About The Organiser',
          multiline: true,
        }),
        brand: fields.image({
          label: 'brand logo',
          directory: 'src/assets/images/organisers',
          publicPath: '../../assets/images/organisers/',
        }),
        insert1: fields.image({
          label: 'Image 1',
          directory: 'src/assets/images/organisers',
          publicPath: '../../assets/images/organisers/',
        }),
        insert2: fields.image({
          label: 'Image 2',
          directory: 'src/assets/images/organisers',
          publicPath: '../../assets/images/organisers/',
        }),
        insert3: fields.image({
          label: 'Image 3',
          directory: 'src/assets/images/organisers',
          publicPath: '../../assets/images/organisers/',
        }),
        content: fields.markdoc({
          label: 'content',
        }),
      }
    }),

    Spots: collection({
      label: 'Skate Spots',
      slugField: 'name',
      path: 'src/content/spots/*',
      format: { contentField: 'content'},
      schema: {
        name: fields.text({ label: 'Skate Spot'}),
        status: fields.select({
          label: 'Status', 
          options: [
            {label: 'Draft', value: 'draft'},
            {label: 'Published', value: 'published'},
          ], defaultValue: 'draft',
         }),
        cover: fields.image({
          label: 'Cover Image',
          directory: 'src/assets/images/spots',
          publicPath: '../../assets/images/spots/',
        }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
            // Where the actual files are saved
            directory: 'src/assets/images/spots',
            publicPath: '../../assets/images/spots/',
          }},
        }),
      },
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