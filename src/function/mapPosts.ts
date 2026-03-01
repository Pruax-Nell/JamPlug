
import type { CollectionEntry } from 'astro:content';

import { formatLocation } from "../data/globe-constants";
import { formatFestivalDate, formatEventDate, formatDate } from "./dateHelper";

import BlogPlaceholder from '../assets/placeholder/placeholder-blogPoster.jpg'

// all blog props
export const mapBlogFull = (post: CollectionEntry<'posts'>) => ({

    id: post.id,
    url: `/blog/${post.id}`,

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
        src: post.data.coverImage?.src || BlogPlaceholder,
        alt: post.data.coverImage?.alt || post.data.title,
        caption: post.data.coverImage?.caption || '@YourJamPlug',
    },
});

// small card on home page
export const mapBlogToCard = (post: CollectionEntry<'posts'>) => ({
    variant: "blog" as const,

    id: post.id,
    url: `/blog/${post.id}`,

    title: post.data.title,
    subtitle: post.data.subtitle,
    description: post.data.description,

    poster: {
        src: post.data.coverImage?.src || BlogPlaceholder,
        alt: post.data.coverImage?.alt || post.data.title,
        caption: post.data.coverImage?.caption || '@YourJamPlug',
    },
    category: post.data.blogCategory,
    discipline: post.data.skateDiscipline,
    published: post.data.published,
});

