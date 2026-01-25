import { defineAction } from 'astro:actions';
import { z } from 'astro:content';
import { locationSchema } from '../shared.config'; // The one we moved

export const server = {
  submitEvent: defineAction({
    accept: 'form',
    input: z.object({
      eventName: z.string().min(3),
      // Use your existing location schema here!
      location: locationSchema, 
      // Add other fields from your form
    }),
    handler: async (input) => {
      // This code runs ONLY on the server (Node.js)
      console.log("Validated Data:", input.location.country);
      
      // Here is where you would send the email or save to a database
      return { success: true, message: "Event received!" };
    }
  })
};