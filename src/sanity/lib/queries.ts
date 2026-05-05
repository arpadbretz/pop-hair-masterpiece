import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    phone,
    email,
    address,
    googleMapsEmbedUrl,
    bookingUrl,
    openingHours,
    instagramUrl,
    facebookUrl,
    tiktokUrl,
    googleRating,
    reviewCount
  }
`;

export const homeContentQuery = groq`
  *[_type == "homeContent"][0] {
    heroEyebrow,
    heroTitleLine1,
    heroTitleLine2,
    heroSubtitle,
    heroVideoMp4,
    heroVideoWebm,
    heroVideoPoster,
    kmTitle,
    kmDescription,
    kmImage,
    yearsExperience,
    reviewBadgeCount
  }
`;

export const aboutContentQuery = groq`
  *[_type == "aboutContent"][0] {
    philosophyTitleLine1,
    philosophyTitleLine2,
    philosophyQuote,
    philosophyBody,
    philosophyImage,
    kmFilozofiaBody,
    kmFilozofiaImage,
    closingQuote,
    closingQuoteAuthor,
    whyChooseUsTitle,
    whyChooseUsItems
  }
`;

export const servicesContentQuery = groq`
  *[_type == "servicesContent"][0] {
    repairImage,
    actionImage,
    actionTitleLine1,
    actionTitleLine2,
    actionSubtitle,
    introBody,
    closingBody,
    hairExtensionsTitle,
    hairExtensionsBody
  }
`;

export const weddingContentQuery = groq`
  *[_type == "weddingContent"][0] {
    heroEyebrow,
    heroTitleLine1,
    heroTitleLine2,
    heroQuote,
    heroImage,
    expertiseBody,
    expertiseImageLeft,
    expertiseImageRight,
    yearsLabel,
    weddingsLabel,
    lookbookImages,
    ctaTitleLine1,
    ctaTitleLine2
  }
`;

export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id, name, role, speciality, bio, image
  }
`;

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id, name, price, description, icon, highlight
  }
`;

export const galleryImagesQuery = groq`
  *[_type == "galleryImage"] | order(order asc) {
    _id, title, image, category, size, videoUrl
  }
`;

export const reviewsQuery = groq`
  *[_type == "review"] | order(order asc) {
    _id, name, platform, text, rating
  }
`;

export const weddingProcessStepsQuery = groq`
  *[_type == "weddingProcessStep"] | order(order asc) {
    _id, title, description, icon
  }
`;

export const blogPostsQuery = groq`
  *[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    category,
    coverImage,
    excerpt
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    category,
    coverImage,
    excerpt,
    videoUrl,
    body
  }
`;

export const blogPostSlugsQuery = groq`
  *[_type == "blogPost" && defined(slug.current)].slug.current
`;
