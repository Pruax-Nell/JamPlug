
import type { CollectionEntry } from 'astro:content';

import { formatLocation } from "../data/globe-constants";
import { formatFestivalDate, formatEventDate, formatDate } from "./dateHelper";
import { getImageSource } from '../function/sourceHelper';
import type { KeystaticImage } from './types';

import BlogPlaceholder from '../assets/placeholder/placeholder-blogPoster.jpg'

// all blog props
export const mapBlogFull = (post: CollectionEntry<'posts'>) => {
    const cleanSlug = post.id.replace(/\.[^/.]+$/, "");
    
    return {
        id: post.id,
        url: `/blog/post/${cleanSlug}`,
        
        title: post.data.title,
        subtitle: post.data.subtitle,
        description: post.data.description,
        authorID: post.data.author.profile.id,
        anonymous: post.data.author.isAnonymous,
        status: post.data.status,
        isFeatured: post.data.isFeatured,
        updated: post.data.updated,  
        
        category: post.data.blogCategory,
        discipline: post.data.skateDiscipline,
        published: post.data.published,
        poster: {
            src: getImageSource(post.data.coverImage, BlogPlaceholder),
            alt: post.data.coverImage?.alt || post.data.title,
            caption: post.data.coverImage?.caption || '@YourJamPlug',
            isPlaceholder: !post.data.coverImage?.src,
            
        },
}
};

// small card on home page
export const mapBlogToCard = (post: CollectionEntry<'posts'>) => {
    const cleanSlug = post.id.replace(/\.[^/.]+$/, "");

    return {
        variant: "blog" as const,

        id: post.id,
        url: `/blog/post/${cleanSlug}`,

        title: post.data.title,
        subtitle: post.data.subtitle,
        description: post.data.description,

        poster: {
            src: getImageSource(post.data.coverImage, BlogPlaceholder),
            alt: post.data.coverImage?.alt || post.data.title,
            caption: post.data.coverImage?.caption || '@YourJamPlug',
            isPlaceholder: !post.data.coverImage?.src,
        },
        category: post.data.blogCategory,
        discipline: post.data.skateDiscipline,
        published: post.data.published,
    }

};

