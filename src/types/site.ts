export interface Social {
  github: string;
  email: string;
}

export interface Footer {
  copyright: string;
  copyrightUrl: string;
  year: number;
  allRightsReserved: string;
  baseTitle: string;
  baseUrl: string;
}

export interface Friend {
  id: string;
  name: string;
  logo: string;
  tier: "main" | "platinum" | "gold" | "silver";
  size: "2xl" | "xl" | "lg" | "md";
  url?: string;
  desc?: string;
}

export interface Site {
  name: string;
  avatar: string;
  description: string;
  url: string;
  ogImage: string;
  social: Social;
  footer: Footer;
  friends: Friend[];
}
