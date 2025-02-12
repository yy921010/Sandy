import { Config } from "~/config";

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: Config.base.title,
    description: Config.base.description,
    url: Config.base.baseUrl,
    author: {
      "@type": "Person",
      name: Config.base.author,
    },
  };
}

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: Config.base.author,
    url: Config.base.baseUrl,
    sameAs: [Config.social.github],
  };
}

export function generateArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  image,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url: url,
    datePublished: datePublished,
    dateModified: dateModified,
    image: image,
    author: {
      "@type": "Person",
      name: Config.base.author,
      url: Config.base.baseUrl,
    },
    publisher: {
      "@type": "Person",
      name: Config.base.author,
      url: Config.base.baseUrl,
    },
  };
}

export function generateCollectionPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "友情链接",
    description: "感谢认识他们",
    url: `${Config.base.baseUrl}/partner-link`,
    author: {
      "@type": "Person",
      name: Config.base.author,
    },
  };
}
