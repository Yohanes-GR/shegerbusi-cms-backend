import type { ContentNode, Division } from "./data";

export type { ContentNode, Division };

export type MotionImage = {
  src: string;
  alt: string;
};

export type MotionEffect = "kenburns" | "zoom-in" | "zoom-out" | "pan" | "fade" | "still";

export type HomeContent = {
  kicker: string;
  title: string;
  titleLine2: string;
  subtitle: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  divisionsKicker: string;
  divisionsTitle: string;
  processKicker: string;
  processTitle: string;
  processText: string;
  projectsKicker: string;
  projectsTitle: string;
  ctaTitle: string;
  ctaText: string;
  motion: {
    mode: "slideshow" | "video" | "both";
    effect: MotionEffect;
    videoUrl: string;
    intervalMs: number;
    images: MotionImage[];
  };
};

export type AboutContent = {
  kicker: string;
  title: string;
  text: string;
  image: string;
  whyKicker: string;
  whyTitle: string;
  paragraphs: string[];
};

export type PageCopy = {
  kicker: string;
  title: string;
  text: string;
  image: string;
};

export type Partner = {
  name: string;
  logo: string;
  url?: string;
};
export type ProcessStep = { n: string; title: string; text: string };

export type Project = {
  slug: string;
  title: string;
  category: string;
  division: string;
  location: string;
  year: string;
  image: string;
  summary: string;
};

export type Listing = {
  id: string;
  title: string;
  type: string;
  status: string;
  area: string;
  size: string;
  price: string;
  image: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type Company = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  phone: string;
  mobile: string;
  email: string;
  address: string;
  mapsUrl: string;
  hours: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  youtube: string;
  telegram: string;
  whatsapp: string;
  logo: string;
};

export type SiteContent = {
  company: Company;
  stats: Stat[];
  partners: Partner[];
  divisions: Division[];
  projects: Project[];
  listings: Listing[];
  processSteps: ProcessStep[];
  home: HomeContent;
  about: AboutContent;
  pages: {
    services: PageCopy;
    projects: PageCopy;
    contact: PageCopy;
    realEstate: PageCopy;
  };
};
