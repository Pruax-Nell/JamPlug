


// --- RINK DATA --- //
create a collection of rinks and relate them to events and other.
add a rink every time its discovered. 

rink data plan
1. The "Phase 1" Approach (Right Now)
For now, treat the Rink as a simple Text Field in your Keystatic events collection.

In Keystatic: Use fields.text({ label: 'Rink Name' }).

In your Filter Scanner: Just scan the text strings and use the normalizeTown function to clean them up.

In your Filters: It will behave exactly like your other filters.

2. The "Upgrade" Path (The Future)
When you decide you are ready for a "Rinks Collection," the migration looks like this:

CMS: Change fields.text to fields.relationship in your Keystatic config.

Data: Keystatic will now save a Slug instead of a String.

Code: You update one line in your match function to look for the slug.

<!-- long term plan -->
// keystatic.config.ts
export default config({
  collections: {
    rinks: collection({
      label: 'Rinks',
      slugField: 'name',
      path: 'src/content/rinks/*',
      schema: {
        name: fields.slug({ name: { label: 'Rink Name' } }),
        country: fields.select({
          label: 'Country',
          options: [{ label: 'UK', value: 'uk' }, { label: 'France', value: 'france' }],
          defaultValue: 'uk',
        }),
      },
    }),
    events: collection({
      label: 'Events',
      slugField: 'title',
      path: 'src/content/events/*',
      schema: {
        title: fields.text({ label: 'Title' }),
        // RELATIONSHIP: This links the event to a Rink ID
        rink: fields.relationship({
          label: 'Featured Rink',
          collection: 'rinks',
        }),
        // ... other fields like country, startDate
      },
    }),
  },
});

// --- EVENT DATA --- //

status: --------------------- set list data / ennum / object-array
published:  --------------------- set list data / ennum / object-array

isFeatured:  --------------------- true/false !! VISUAL ONLY

eventName: ------- 
subheading: ------- 
description: ------- 
startDate: ------- 
endDate: ------- 

country:   ------- set list data / ennum / object-array
townCity:  ------- dynamic set list - depends on country list
eventType: -------  set list data / ennum / object-array
skateDiscipline: -------  set list data / ennum / object-array
skillLevel: -------   set list data / ennum / object-array
minAge: -------  set list [all / 18+ / 21+ ...] or dynamic from strings  
maxAge: -------  dynamic from strings 
startTime: ------- 
endTime:  ------- 
eventPoster:  ------- image

eventLink: -------
ticketLink: -------
organiser: -------
orgLink: -------
host: -------
hostLink: -------
coach: -------
coachLink: -------
dj: -------
djLink: -------
rink: -------
venueAddress: -----
mapCoordinates: -----
offSkates: ----- true/false
repetition:-----  

// ---BLOG DATA --- //

status:  ------
published: ------
title:  ------
subtitle:  ------
description: ------

blogCategory: ------
skateDiscipline:  ------       
coverImage: ------ 


buttons

Suggested Category Mapping:
Dance / Jam: Pink Theme (--main-pink) — Energetic, flashy, and fun.

Park / Aggressive: Teal Theme (--main-teal) — Edgy, fresh, and modern.

Slalom / Skills: Yellow Theme (--main-yellow) — Caution/Technical focus; high visibility for "Learning."

Trail / Distance: Orange Theme (--main-orange) — Classic endurance and warmth.

Community / Meetups: Purple Theme (--main-purple) — Welcoming and inclusive.

Admin / Info: Brown Theme (--main-brown) — Grounded and official.

<!-- Colour contrast -->

Orange, || --main-orange, || var(--main-dark),
Orange is bright; dark text is sharper.

Purple, || --main-purple, || var(--text-white),
Purple is deep; white text provides high contrast.

Teal, || --main-teal, || var(--main-dark),
"Teal is a ""mid-light"" color; dark text is safer."

Pink, || --main-pink, || var(--text-white),
This pink is saturated; light text pops best.

Yellow, || --main-yellow, || var(--main-dark),
Crucial: White text on yellow is invisible. Always use dark.

Brown, || --main-brown, || var(--text-white),
Brown is very dark; white text is required.
