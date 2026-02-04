import { fields } from '@keystatic/core';
import { 
  CONTINENT_DATA, 
  getRegionOptions,  
} from '../../data/globe-constants';

import { slugify } from '../stringHelper';

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