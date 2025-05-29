# Puper - Modern Personal Blog System

A modern personal blog system built with [Next.js](https://nextjs.org) App Router, featuring elegant theme transitions, interactive friend links display, MDX content support, and more. This project leverages the latest Web technology stack, supports responsive design, and is optimized for performance.

## Key Features

- 🌓 **Elegant Theme Switching**: Circle expansion animation effect using View Transitions API
- 📝 **MDX Content Support**: Support for Markdown and MDX format blog posts
- 🔗 **Interactive Friend Links**: Beautiful link display using circular layout and Fibonacci distribution
- 📱 **Fully Responsive**: Adapts to various device sizes
- 🔍 **SEO Friendly**: Integrated metadata and OpenGraph image generation
- 📰 **RSS Support**: Automatically generated site RSS feed

## Tech Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **Styling Solution**: Tailwind CSS + Shadcn UI
- **Content Management**: MDX + Gray Matter
- **Animation Effects**: CSS View Transitions
- **Date Handling**: Day.js
- **Icon System**: Lucide React

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment

It's recommended to deploy this project using the [Vercel Platform](https://vercel.com/new), which offers the simplest deployment experience and optimal performance.

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy the project
vercel
```

You can also manually build the project:

```bash
# Build the project
npm run build

# Start the production server
npm start
```

## Project Structure

```
src/
  ├── app/               # Next.js App Router directory
  │   ├── (blog)/        # Blog-related route group
  │   ├── og/            # OpenGraph image generation
  │   └── rss/           # RSS feed generation
  ├── components/        # React components
  │   ├── ui/            # Common UI components
  │   └── ...            # Feature-specific components
  ├── contents/          # Blog content (Markdown/MDX)
  │   ├── blogs/         # Blog posts
  │   └── notes/         # Notes
  ├── lib/               # Utility functions and libraries
  └── config/            # Site configuration
```

## Customization

You can modify the site's basic information, social media links, and friend links by editing the `src/config/index.tsx` file.

To add new blog posts, simply create new `.md` or `.mdx` files in the `src/contents/blogs/` directory.

## License

MIT © [Ethan Young](https://github.com/yy921010)
