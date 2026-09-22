import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import type { Prisma } from "@prisma/client";
import {
  company,
  divisions,
  listings,
  processSteps,
  projects,
  stats,
} from "./data";
import { showcaseImages } from "./gallery";
import { prisma } from "./prisma";
import type {
  AboutContent,
  ContentNode,
  Division,
  HomeContent,
  PageCopy,
  SiteContent,
} from "./types";

const uploadsDir = path.join(process.cwd(), "public", "uploads");

export function defaultSite(): SiteContent {
  return {
    company,
    stats,
    partners: [],
    divisions,
    projects,
    listings,
    processSteps,
    home: {
      kicker: "Sheger Business Group",
      title: "Engineering ambition.",
      titleLine2: "Building Ethiopia.",
      subtitle:
        "Five divisions. One accountable group. Architecture and engineering, construction, real estate, interiors, and international trade.",
      ctaPrimaryLabel: "Explore services",
      ctaPrimaryHref: "/services",
      ctaSecondaryLabel: "Talk to the group",
      ctaSecondaryHref: "/contact",
      divisionsKicker: "Operating divisions",
      divisionsTitle: "A full stack for the built environment and trade.",
      processKicker: "How we work",
      processTitle: "From first sketch to last shipment.",
      processText:
        "Clients stay with Sheger because the same group can study, design, build, furnish, sell, and supply. Fewer handoffs. Clearer accountability.",
      projectsKicker: "Selected work",
      projectsTitle: "Projects across the group.",
      ctaTitle: "Ready to brief Sheger?",
      ctaText:
        "Whether you need a feasibility study, a contractor, a home, or a container of materials — start with one conversation.",
      motion: {
        mode: "slideshow",
        effect: "kenburns",
        videoUrl: "",
        intervalMs: 7000,
        images: showcaseImages.slice(0, 6),
      },
    },
    about: {
      kicker: "The group",
      title:
        "One name behind design, construction, property, interiors, and trade.",
      text: company.description,
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80",
      whyKicker: "Why Sheger",
      whyTitle:
        "Built for clients who are tired of assembling a project from five different firms.",
      paragraphs: [
        "Sheger Business Group was formed so Ethiopian clients — public agencies, private developers, and families — could brief a single organisation for the full life of a project.",
        "Sheger Architect studies and designs. Technology General Contractor builds. Finfine Real Estate develops and sells. Interior Design fits out the rooms people actually use. Export and Import moves cash crops out and construction materials in.",
        "We work from Addis Ababa across Ethiopia, with a particular strength in building, roads, water, bridges, post-tension, and substructure.",
      ],
    },
    pages: {
      services: {
        kicker: "Services",
        title: "Every capability, searchable and organised by division.",
        text: "Filter the group’s work — from building design and post-tension to cash-crop exports and show-home interiors.",
        image:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2400&q=80",
      },
      projects: {
        kicker: "Portfolio",
        title: "Work that cuts across the group.",
        text: "Filter by architecture, building, roads, bridges, interiors, and trade.",
        image:
          "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2400&q=80",
      },
      contact: {
        kicker: "Contact",
        title: "Brief the group. We will route it to the right division.",
        text: "Architecture, construction, real estate, interiors, or trade — one desk takes the first call.",
        image:
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=2400&q=80",
      },
      realEstate: {
        kicker: "Finfine Real Estate",
        title:
          "Homes, villas, and commercial space — developed and marketed by the group.",
        text: "Browse current listings or talk to us about a development site.",
        image:
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2400&q=80",
      },
    },
  };
}

type ServiceRow = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  logo: string;
  gallery: string[];
  highlights: string[];
  isDivision: boolean;
  code: string | null;
  shortName: string | null;
  accent: string | null;
  parentId: string | null;
  sortOrder: number;
};

function toNode(row: ServiceRow, byParent: Map<string, ServiceRow[]>): ContentNode {
  const children = (byParent.get(row.id) ?? []).map((child) =>
    toNode(child, byParent),
  );
  return {
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    description: row.description,
    image: row.image,
    logo:
      row.logo?.replace("/brand/sheger-architect-logo.jpg", "/brand/sheger-architect-logo.png") ||
      (row.slug === "sheger-architect" ? "/brand/sheger-architect-logo.png" : ""),
    gallery: row.gallery?.filter(Boolean) ?? [],
    highlights: row.highlights.filter(Boolean),
    children: children.length ? children : undefined,
  };
}

async function insertServices(
  tx: Prisma.TransactionClient,
  nodes: ContentNode[],
  parentId: string | null,
  isDivision: boolean,
) {
  for (const [index, node] of nodes.entries()) {
    const division = node as Division;
    const created = await tx.service.create({
      data: {
        slug: node.slug,
        title: node.title,
        summary: node.summary,
        description: node.description,
        image: node.image,
        logo: node.logo ?? "",
        gallery: node.gallery?.filter(Boolean) ?? [],
        highlights: node.highlights ?? [],
        isDivision,
        code: isDivision ? division.code : null,
        shortName: isDivision ? division.shortName : null,
        accent: isDivision ? division.accent : null,
        sortOrder: index,
        parentId,
      },
    });
    if (node.children?.length) {
      await insertServices(tx, node.children, created.id, false);
    }
  }
}

async function loadSite(): Promise<SiteContent | null> {
  const [
    companyRow,
    homeRow,
    aboutRow,
    pageRows,
    statRows,
    stepRows,
    serviceRows,
    projectRows,
    listingRows,
    partnerRows,
  ] = await Promise.all([
    prisma.company.findUnique({ where: { id: "main" } }),
    prisma.home.findUnique({
      where: { id: "main" },
      include: { motionImages: { orderBy: { sortOrder: "asc" } } },
    }),
    prisma.about.findUnique({ where: { id: "main" } }),
    prisma.pageCopy.findMany(),
    prisma.stat.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.processStep.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.service.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.project.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.listing.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.partner.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  if (!companyRow || !homeRow || !aboutRow) return null;

  const pages = Object.fromEntries(pageRows.map((page) => [page.key, page])) as Record<
    string,
    PageCopy & { key?: string }
  >;
  const fallback = defaultSite();
  const byParent = new Map<string, ServiceRow[]>();
  for (const row of serviceRows) {
    const key = row.parentId ?? "__root__";
    const list = byParent.get(key) ?? [];
    list.push(row);
    byParent.set(key, list);
  }
  const roots = byParent.get("__root__") ?? [];
  const loadedDivisions: Division[] = roots
    .filter((row) => row.isDivision)
    .map((row) => {
      const node = toNode(row, byParent);
      return {
        ...node,
        code: row.code ?? "01",
        shortName: row.shortName ?? row.title,
        accent: row.accent ?? "",
      };
    });

  return {
    company: {
      name: companyRow.name,
      shortName: companyRow.shortName,
      tagline: companyRow.tagline,
      description: companyRow.description,
      phone: companyRow.phone,
      mobile: companyRow.mobile,
      email: companyRow.email,
      address: companyRow.address,
      mapsUrl: companyRow.mapsUrl ?? "",
      hours: companyRow.hours,
      facebook: companyRow.facebook,
      instagram: companyRow.instagram,
      linkedin: companyRow.linkedin,
      twitter: companyRow.twitter,
      youtube: companyRow.youtube,
      telegram: companyRow.telegram,
      whatsapp: companyRow.whatsapp,
      logo:
        (companyRow.logo || "/brand/sbg-logo.png").replace(
          "/brand/sbg-logo.jpg",
          "/brand/sbg-logo.png",
        ),
    },
    stats: statRows.map((row) => ({ value: row.value, label: row.label })),
    partners: partnerRows.map((row) => ({
      name: row.name,
      logo: row.logo,
      url: row.url || undefined,
    })),
    processSteps: stepRows.map((row) => ({ n: row.n, title: row.title, text: row.text })),
    divisions: loadedDivisions,
    projects: projectRows.map((row) => ({
      slug: row.slug,
      title: row.title,
      category: row.category,
      division: row.division,
      location: row.location,
      year: row.year,
      image: row.image,
      summary: row.summary,
    })),
    listings: listingRows.map((row) => ({
      id: row.listingId,
      title: row.title,
      type: row.type,
      status: row.status,
      area: row.area,
      size: row.size,
      price: row.price,
      image: row.image,
    })),
    home: {
      kicker: homeRow.kicker,
      title: homeRow.title,
      titleLine2: homeRow.titleLine2,
      subtitle: homeRow.subtitle,
      ctaPrimaryLabel: homeRow.ctaPrimaryLabel,
      ctaPrimaryHref: homeRow.ctaPrimaryHref,
      ctaSecondaryLabel: homeRow.ctaSecondaryLabel,
      ctaSecondaryHref: homeRow.ctaSecondaryHref,
      divisionsKicker: homeRow.divisionsKicker,
      divisionsTitle: homeRow.divisionsTitle,
      processKicker: homeRow.processKicker,
      processTitle: homeRow.processTitle,
      processText: homeRow.processText,
      projectsKicker: homeRow.projectsKicker,
      projectsTitle: homeRow.projectsTitle,
      ctaTitle: homeRow.ctaTitle,
      ctaText: homeRow.ctaText,
      motion: {
        mode: (homeRow.motionMode as HomeContent["motion"]["mode"]) || "slideshow",
        effect: (homeRow.motionEffect as HomeContent["motion"]["effect"]) || "kenburns",
        videoUrl: homeRow.motionVideoUrl,
        intervalMs: homeRow.motionIntervalMs,
        images: homeRow.motionImages.map((image) => ({ src: image.src, alt: image.alt })),
      },
    },
    about: {
      kicker: aboutRow.kicker,
      title: aboutRow.title,
      text: aboutRow.text,
      image: aboutRow.image,
      whyKicker: aboutRow.whyKicker,
      whyTitle: aboutRow.whyTitle,
      paragraphs: aboutRow.paragraphs,
    } satisfies AboutContent,
    pages: {
      services: pages.services ?? fallback.pages.services,
      projects: pages.projects ?? fallback.pages.projects,
      contact: pages.contact ?? fallback.pages.contact,
      realEstate: pages.realEstate ?? fallback.pages.realEstate,
    },
  };
}

export async function getSite(): Promise<SiteContent> {
  noStore();
  const existing = await loadSite();
  if (existing) return existing;
  const site = defaultSite();
  await saveSite(site);
  return site;
}

export async function saveSite(site: SiteContent) {
  await prisma.$transaction(
    async (tx) => {
      await tx.company.upsert({
        where: { id: "main" },
        update: site.company,
        create: { id: "main", ...site.company },
      });

      const { motion, ...homeFields } = site.home;
      await tx.home.upsert({
        where: { id: "main" },
        update: {
          ...homeFields,
          motionMode: motion.mode,
          motionVideoUrl: motion.videoUrl,
          motionIntervalMs: motion.intervalMs,
          motionEffect: motion.effect || "kenburns",
        },
        create: {
          id: "main",
          ...homeFields,
          motionMode: motion.mode,
          motionVideoUrl: motion.videoUrl,
          motionIntervalMs: motion.intervalMs,
          motionEffect: motion.effect || "kenburns",
        },
      });
      await tx.motionImage.deleteMany({ where: { homeId: "main" } });
      if (motion.images.length) {
        await tx.motionImage.createMany({
          data: motion.images.map((image, sortOrder) => ({
            src: image.src,
            alt: image.alt,
            sortOrder,
            homeId: "main",
          })),
        });
      }

      await tx.about.upsert({
        where: { id: "main" },
        update: site.about,
        create: { id: "main", ...site.about },
      });

      for (const [key, page] of Object.entries(site.pages)) {
        await tx.pageCopy.upsert({
          where: { key },
          update: page,
          create: { key, ...page },
        });
      }

      await tx.stat.deleteMany();
      await tx.stat.createMany({
        data: site.stats.map((stat, sortOrder) => ({ ...stat, sortOrder })),
      });

      await tx.partner.deleteMany();
      if (site.partners?.length) {
        await tx.partner.createMany({
          data: site.partners.map((partner, sortOrder) => ({
            name: partner.name,
            logo: partner.logo,
            url: partner.url ?? "",
            sortOrder,
          })),
        });
      }

      await tx.processStep.deleteMany();
      await tx.processStep.createMany({
        data: site.processSteps.map((step, sortOrder) => ({ ...step, sortOrder })),
      });

      await tx.project.deleteMany();
      if (site.projects.length) {
        await tx.project.createMany({
          data: site.projects.map((project, sortOrder) => ({ ...project, sortOrder })),
        });
      }

      await tx.listing.deleteMany();
      if (site.listings.length) {
        await tx.listing.createMany({
          data: site.listings.map((listing, sortOrder) => ({
            listingId: listing.id,
            title: listing.title,
            type: listing.type,
            status: listing.status,
            area: listing.area,
            size: listing.size,
            price: listing.price,
            image: listing.image,
            sortOrder,
          })),
        });
      }

      await tx.service.deleteMany();
      await insertServices(tx, site.divisions, null, true);
    },
    { timeout: 30000 },
  );

  try {
    revalidatePath("/", "layout");
  } catch {
    // Seed and CLI scripts run outside a Next.js request.
  }
}

export async function listUploads() {
  const rows = await prisma.media.findMany({ orderBy: { createdAt: "desc" } });
  return rows.map((row) => ({ name: row.name, url: row.url }));
}

export async function saveUpload(file: File) {
  await mkdir(uploadsDir, { recursive: true });
  const safe = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "-");
  const name = `${Date.now()}-${safe}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadsDir, name), buffer);
  const url = `/uploads/${name}`;
  await prisma.media.create({
    data: {
      name,
      url,
      mimeType: file.type,
      size: file.size,
    },
  });
  return { name, url };
}

export async function deleteUpload(name: string) {
  const safe = path.basename(name);
  await prisma.media.deleteMany({ where: { name: safe } });
  try {
    await unlink(path.join(uploadsDir, safe));
  } catch {
    // file may already be gone
  }
}
