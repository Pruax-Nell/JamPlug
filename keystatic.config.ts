// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';
import { SOCIAL_MEDIA, SKATE_DISCIPLINES, BLOG_CATEGORY, SKILL_LEVEL, EVENT_TYPE, GROUPED_COUNTRIES, POST_STATUS } from './src/constants'

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
      entryLayout: 'content',
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
          // directory: 'src/content/blog',
          directory: 'src/content/images/blog',
          publicPath: '../../images/blog/',
          transformFilename: (name) => `CoverImage-${name.replaceAll(/\s+/g, '-')}`
        }),
        gallery1: fields.image({
          label: 'Gallery Image 1',
          // directory: 'src/content/blog',
          directory: 'src/content/images/blog',
          publicPath: '../../images/blog/',
          transformFilename: (name) => `image-1-${name.replaceAll(/\s+/g, '-')}`
        }),
        gallery2: fields.image({
          label: 'Gallery Image 2',
          // directory: 'src/content/blog',
          directory: 'src/content/images/blog',
          publicPath: '../../images/blog/',
          transformFilename: (name) => `image-2-${name.replaceAll(/\s+/g, '-')}`
        }),
        gallery3: fields.image({
          label: 'Gallery Image 3',
          // directory: 'src/content/blog',
          directory: 'src/content/images/blog',
          publicPath: '../../images/blog/',
          transformFilename: (name) => `image-3-${name.replaceAll(/\s+/g, '-')}`
        }),
        gallery4: fields.image({
          label: 'Gallery Image 4',
          // directory: 'src/content/blog',
          directory: 'src/content/images/blog',
          publicPath: '../../images/blog/',
          transformFilename: (name) => `image-4-${name.replaceAll(/\s+/g, '-')}`
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
      entryLayout: 'content',
      format: { contentField: 'content'},
      schema: {
      // CMS ADMIN FIELDS
        status: fields.select({
          label: 'Status', 
          options: POST_STATUS,
          defaultValue: 'draft',
        }),
        // published: fields.date({ label: 'Published Date' }),
        isFeatured: fields.checkbox({ label: 'Is Featured' }),
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
        eventPoster: fields.image({
          label: 'Event Poster',
          directory: 'src/content/images/events',
          publicPath: '../../images/events/',
          transformFilename: (name) => `CoverImage-${name.replaceAll(/\s+/g, '-')}`
        }),
        flyerImage1: fields.image({
          label: 'Flyer 1',
          directory: 'src/content/images/events',
          publicPath: '../../images/events/',
          transformFilename: (name) => `flyer-1-${name.replaceAll(/\s+/g, '-')}`
        }),
        flyerImage2: fields.image({
          label: 'Flyer 2',
          directory: 'src/content/images/events',
          publicPath: '../../images/events/',
          transformFilename: (name) => `flyer-2-${name.replaceAll(/\s+/g, '-')}`
        }),
        flyerImage3: fields.image({
          label: 'Flyer 3',
          directory: 'src/content/images/events',
          publicPath: '../../images/events/',
          transformFilename: (name) => `flyer-3-${name.replaceAll(/\s+/g, '-')}`
        }),
        flyerImage4: fields.image({
          label: 'Flyer 4',
          directory: 'src/content/images/events',
          publicPath: '../../images/events/',
          transformFilename: (name) => `flyer-4-${name.replaceAll(/\s+/g, '-')}`
        }),
        flyerImage5: fields.image({
          label: 'Flyer 5',
          directory: 'src/content/images/events',
          publicPath: '../../images/events/',
          transformFilename: (name) => `flyer-4-${name.replaceAll(/\s+/g, '-')}`
        }),
        country: fields.select({
          label: 'Country',
          options: GROUPED_COUNTRIES,
          defaultValue: 'england',
          
        }),
        townCity: fields.text({ 
          label: 'Town / City',
          description: 'e.g. London, Bristol, Lille',
          validation: { isRequired: true }
        }),
        eventType: fields.select({ 
          label:'Event Type',
          options: [
            { label: '-- Selection Required --', value: '' }, 
            ...EVENT_TYPE 
          ],
          defaultValue: '',
        }),
        skateDiscipline: fields.select({ 
          label: 'Skate Discipline',
          options: [
            {label: '-- Selection Required --', value: ''},
            ...SKATE_DISCIPLINES
          ],
          defaultValue: '', 
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
        ticketLink: fields.url({ label: 'Ticket Link' }),
        tickets: fields.array(
          fields.object({
            name: fields.text({ label: 'Tickets'}),
            directLink: fields.url({ label: 'URL', validation: { isRequired: false } })
          }),
          {
            label: 'Ticket Links'
          }
        ),
        organiser: fields.text({ label: 'Organiser'}),
        orgLink: fields.url({ label: 'Organisers link'}),
        organisers: fields.array(
          fields.object({
            name: fields.text({label: 'Org Name'}),
            socialLinks: fields.array(
            fields.object({
              platform: fields.select({
              label: 'Platform',
              options: SOCIAL_MEDIA,
              defaultValue: 'socials',
            }),
              url: fields.url({ label: 'URL', validation: { isRequired: false } }),
            }),
            {
              label: 'Social Links',
              itemLabel: (props) => props.fields.platform.value || 'New Link',
            }
          ),
          }),
          {
            label: 'Organiser',
            itemLabel: (props) => props.fields.name.value || 'Organiser',
          }
        ),
        host: fields.text({ label: 'Event Host' }),
        hostLink: fields.url({ label: 'host link'}),
        hosts: fields.array(
          fields.object({
            name: fields.text({label: 'Host Name'}),
            socialLinks: fields.array(
            fields.object({
              platform: fields.select({
              label: 'Platform',
              options: SOCIAL_MEDIA,
              defaultValue: 'socials',
            }),
              url: fields.url({ label: 'URL', validation: { isRequired: false } }),
            }),
            {
              label: 'Social Links',
              itemLabel: (props) => props.fields.platform.value || 'New Link',
            }
          ),
          }),
          {
            label: 'Host',
            itemLabel: (props) => props.fields.name.value || 'Host',
          }
        ),
        coach: fields.text({ label: 'Coach' }),
        coachLink: fields.url({ label: 'coach link'}),
        coaches: fields.array(
          fields.object({
            name: fields.text({label: 'Coach Name'}),
            socialLinks: fields.array(
            fields.object({
              platform: fields.select({
              label: 'Platform',
              options: SOCIAL_MEDIA,
              defaultValue: 'socials',
            }),
              url: fields.url({ label: 'URL', validation: { isRequired: false } }),
            }),
            {
              label: 'Social Links',
              itemLabel: (props) => props.fields.platform.value || 'New Link',
            }
          ),
          }),
          {
            label: 'Coach',
            itemLabel: (props) => props.fields.name.value || 'Coach',
          }
        ),
        dj: fields.text({ label: 'DJ' }),
        djLink: fields.url({ label: 'dj link'}),
        djs: fields.array(
          fields.object({
            name: fields.text({label: 'DJ Name'}),
            socialLinks: fields.array(
            fields.object({
              platform: fields.select({
              label: 'Platform',
              options: SOCIAL_MEDIA,
              defaultValue: 'socials',
            }),
              url: fields.url({ label: 'URL', validation: { isRequired: false } }),
            }),
            {
              label: 'Social Links',
              itemLabel: (props) => props.fields.platform.value || 'New Link',
            }
          ),
          }),
          {
            label: 'DJs',
            itemLabel: (props) => props.fields.name.value || 'DJ',
          }
        ),
        
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