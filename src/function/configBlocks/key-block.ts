import { fields } from '@keystatic/core';
import { 
  CONTINENT_DATA, 
  getRegionOptions,  
} from '../../data/globe-constants';

import { slugify } from '../stringHelper';

const pathRegistry: Record<string, string> = {
  events: '../../images/events/',
  posts: '../images/posts/',
  business: '../../images/business/',
  author: '../../images/author/',
  default: '../images/'
};

/**
 * @param label - The label for the image field (e.g., 'Flyer 1')
 * @param path - The specific directory path (e.g., 'events' or 'posts')
 * @param prefix - A prefix for the filename (e.g., 'flyer-1')
 */

export const imageField = (label: string, path: string, prefix: string) => {
  return fields.object({
    src: fields.image({
      label: label,
      directory: `src/content/images/${path}/`,
      publicPath: `../images/${path}/*`,
      transformFilename: (name) => `${prefix}-${name.replaceAll(/\s+/g, '-')}`
    }),
    alt: fields.text({
      label: 'Alt Text',
      description: 'Essential for accessibility',
    }),
    caption: fields.text({
      label: 'Image Caption',
      description: 'e.g. by photographer A, at Rink...',
    }),
  });
};

export const socials = (
  socialOptions: readonly { readonly label: string; readonly value: string; }[]) => {
  return fields.array(
      fields.object({
        platform: fields.select({
          label: 'Platform',
          options: socialOptions,
          defaultValue: 'socials',
        }),
        url: fields.url({ label: 'URL', validation: { isRequired: false } }),
      }),
      {
        label: 'Social Links',
        itemLabel: (props) => {
          const platformValue = props.fields.platform.value;
          const option = socialOptions.find(opt => opt.value === platformValue);
          return option ? option.label : 'New Link';
        }
      }
    )
  };
  

/**
 * A reusable person list field for Keystatic
 * @param role - The role title (e.g., 'Coach', 'DJ')
 * @param socialOptions - Your SOCIAL_MEDIA options array
 */
export const PersonListField = (
  role: string, 
  socialOptions: readonly { readonly label: string; readonly value: string; }[]) => {
  return fields.array(
    fields.object({
      name: fields.text({ label: `${role} Name` }),
      socialLinks: fields.array(
        fields.object({
          platform: fields.select({
            label: 'Platform',
            options: socialOptions,
            defaultValue: 'socials',
          }),
          url: fields.url({ label: 'URL', validation: { isRequired: false } }),
        }),
        {
          label: 'Social Links',
          itemLabel: (props) => {
            const platformValue = props.fields.platform.value;
            const option = socialOptions.find(opt => opt.value === platformValue);
            return option ? option.label : 'New Link';
          }
        }
      ),
    }),
    {
      label: `${role}s`,
      itemLabel: (props) => props.fields.name.value || `New ${role}`,
    }
  );
};

export const mapCoords = fields.object(
  {
    latitudeCoord: fields.number({ 
      label: 'Latitude', 
      validation: { min: -90, max: 90 } 
    }),
    longitudecoord: fields.number({ 
      label: 'Longitude', 
      validation: { min: -180, max: 180 } 
    }),
  },
  {
    label: 'Map Coordinates',
    description: 'Right-click on Google Maps to get these values',
  }
);

export const locationBlock = fields.conditional(
  fields.select({
    label: 'Continent',
    options: CONTINENT_DATA.map(c => ({ 
      label: c.continent, 
      value: slugify(c.continent) 
    })),
    defaultValue: 'europe',
  }),
  {
    ...Object.fromEntries(
      CONTINENT_DATA.map(c => [
        slugify(c.continent),
        fields.conditional(
          fields.select({
            label: `Country (${c.continent})`,
            // Fix applied here:
            options: c.countries.length > 0 
              ? c.countries 
              : [{ label: 'None', value: 'none', hasRegions: false }],
            defaultValue: c.countries[0]?.value || 'none',
          }),
          {
            ...Object.fromEntries(
              c.countries.map(country => [
                country.value,
                country.hasRegions 
                  ? fields.select({
                      label: 'State / Province / Nation',
                      options: getRegionOptions(country.value),
                      defaultValue: getRegionOptions(country.value)[0]?.value || '',
                    })
                  : fields.empty()
              ])
            ),
            // Branch for the fallback 'none' case
            none: fields.empty(),
          }
        ),
      ])
    ),
  }
);