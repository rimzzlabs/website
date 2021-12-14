# How Do I Started with this app?

This app used [Strapi](https://strapi.io) for headless CMS to manage content, [imagekit](https://imagekit.io) for optimized image management

And this app deployed on [Vercel](https://vercel.com) (for frontend app) and [Heroku](https://heroku.com) (for headless CMS).

## Getting Started with Next.js

If you want to use this app for your Personal Website, This is great app for you, I asume you have knowledge with [React](https://reactjs.org), [Next.js](https://nextjs.org), and [Strapi](https://strapi.io).

## Why Strapi

This app has no limitation for the backend or the CMS. but this time I choose Strapi among other CMS out there.

If you want to use another CMS like [contentful](https://contentful.com), it also supported but don't forget to set the type of TypeScript at `.src/types`, as the content structure may different from the current structure.

## Installing strapi app

after you've cloned this repo, you need to install strapi for your CMS.

If you are unfamiliar with Strapi, checkout this cool [tutorial](https://youtu.be/599ogMbXIyA) for strapi course.

Create a Content-Type called projects and build your Content-Type like this so:

```ts
// this only a sketch for you, the actual data from starpi may different,
// see the full types at ./src/types/customType.ts
type SingleProjectType = {
  title: string
  description: string
  // this slug will genereated automaticly by strapi depends on the title
  slug: string
  url: {
    image: string
    github: string
    preview: string
  }
  featured: boolean
}
```

After you've done building the content type, create one content.

Go to settings -> roles -> public in your strapi app, check the find and findOne box to enable you to access the data through the API

## Managing Content

_More Docs coming soon_
