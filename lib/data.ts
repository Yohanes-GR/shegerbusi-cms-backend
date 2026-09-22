export type ContentNode = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  logo?: string;
  gallery?: string[];
  highlights?: string[];
  children?: ContentNode[];
};

export type Division = ContentNode & {
  code: string;
  shortName: string;
  accent: string;
};

export const company = {
  name: "Sheger Business Group",
  shortName: "Sheger",
  tagline: "Architecture. Construction. Real Estate. Trade.",
  description:
    "Sheger Business Group is a diversified Ethiopian enterprise spanning consulting architecture and engineering, technology general contracting, real estate development, interior design, and international trade.",
  phone: "+251 11 562 2543",
  mobile: "+251 91 124 9826",
  email: "info@shegerbusinessgroup.com",
  address:
    "Addis Ababa, Kirkos Sub-City, Woreda 09, Dembel City Center, 5th floor, Room 507A and 507B",
  mapsUrl: "https://maps.app.goo.gl/CXnk4S8LXXFbGe4o7",
  hours: "Monday – Saturday, 8:30 AM – 6:00 PM",
  facebook: "",
  instagram: "",
  linkedin: "",
  twitter: "",
  youtube: "",
  telegram: "",
  whatsapp: "+251 91 124 9826",
  logo: "/brand/sbg-logo.png",
};

export const stats = [
  { value: "15+", label: "Years of delivery" },
  { value: "120+", label: "Projects completed" },
  { value: "50+", label: "Trusted partners" },
  { value: "5", label: "Operating divisions" },
  { value: "40+", label: "Specialist professionals" },
];

export const divisions: Division[] = [
  {
    code: "01",
    slug: "sheger-architect",
    shortName: "Sheger Architect",
    title: "Sheger Architect",
    accent: "Consulting Architecture and Engineering",
    summary:
      "Design, supervision, and specialist engineering for buildings, roads, infrastructure, and water works.",
    description:
      "Sheger Architect is the consulting architecture and engineering arm of the group. We take projects from feasibility and concept through detailed design, bill of quantities, construction supervision, and specialist services such as post-tension, structural strengthening, and urban planning.",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2400&q=80",
    logo: "/brand/sheger-architect-logo.png",
    highlights: [
      "Multidisciplinary design studio",
      "Site supervision and quality control",
      "Specialist post-tension and retrofit",
    ],
    children: [
      {
        slug: "design-supervision",
        title: "Design and Supervision",
        summary:
          "Full design and site supervision for buildings, roads, and infrastructure.",
        description:
          "We prepare concept, schematic, and construction documents, then remain on site to protect design intent, quality, programme, and cost. Our supervision teams coordinate contractors, consultants, and clients through every hold point.",
        image:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
        highlights: [
          "Concept to IFC documentation",
          "Resident engineers on site",
          "Quality, safety, and progress reporting",
        ],
        children: [
          {
            slug: "building-design-supervision",
            title: "Building",
            summary:
              "Architectural and engineering design plus supervision for residential, commercial, and institutional buildings.",
            description:
              "From villas and apartments to offices, hotels, and civic buildings, Sheger Architect delivers coordinated architectural, structural, and MEP design. Supervision covers setting-out, structural works, finishes, and handover.",
            image:
              "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
            highlights: [
              "Architectural and structural packages",
              "MEP coordination",
              "Finish and snagging control",
            ],
          },
          {
            slug: "road-design-supervision",
            title: "Road",
            summary:
              "Geometric, pavement, and drainage design with construction supervision for urban and rural roads.",
            description:
              "Our highways team designs alignments, pavements, junctions, and drainage, then supervises earthworks, sub-base, asphalt, and road furniture so the completed corridor performs for the long term.",
            image:
              "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1600&q=80",
            highlights: [
              "Geometric and pavement design",
              "Drainage and road safety",
              "Asphalt and earthworks supervision",
            ],
          },
          {
            slug: "infrastructure-design-supervision",
            title: "Infrastructure",
            summary:
              "Civil infrastructure design and supervision for utilities, sites, and public works.",
            description:
              "We design and supervise site infrastructure including stormwater, sewer, water supply, retaining works, and utility corridors, integrating civil works with architecture and landscape.",
            image:
              "https://images.unsplash.com/photo-1581094794329-adc7bb88c5d0?auto=format&fit=crop&w=1600&q=80",
            highlights: [
              "Utilities and site civil works",
              "Stormwater and sewer networks",
              "Integrated infrastructure packages",
            ],
          },
        ],
      },
      {
        slug: "post-tension",
        title: "Post Tension",
        summary:
          "Post-tension design, supervision, and delivery for longer spans and leaner structures.",
        description:
          "Post-tensioned concrete allows thinner slabs, longer spans, and reduced material use. Sheger Architect designs PT systems, supervises stressing operations, and coordinates delivery of tendons, anchors, and specialist installation.",
        image:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
        highlights: [
          "PT slab and beam systems",
          "Stressing and grouting control",
          "Material and specialist delivery",
        ],
        children: [
          {
            slug: "post-tension-design-supervision",
            title: "Design and Supervision",
            summary:
              "Tendon layout, stressing calculations, and on-site post-tension supervision.",
            description:
              "We produce PT shop drawings, elongation calculations, and inspection and test plans, then supervise installation, stressing, and grouting so every tendon meets design force and durability requirements.",
            image:
              "https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=1600&q=80",
            highlights: [
              "Shop drawings and stressing records",
              "Anchor and duct inspection",
              "Elongation verification",
            ],
          },
          {
            slug: "post-tension-delivering",
            title: "Delivering",
            summary:
              "Supply and delivery of post-tension systems, accessories, and specialist crews.",
            description:
              "We deliver complete post-tension packages: strands, ducts, anchors, grout, equipment, and trained installation teams, sequenced to the contractor’s pour schedule.",
            image:
              "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80",
            highlights: [
              "Strand, duct, and anchor supply",
              "On-programme site delivery",
              "Specialist installation crews",
            ],
          },
        ],
      },
      {
        slug: "consulting-interior-design",
        title: "Interior Design",
        summary:
          "Interior concepts, FF&E, and finish specifications for living, working, and hospitality spaces.",
        description:
          "Our interior studio shapes atmospheres that match the architecture: space planning, materials, lighting, joinery, and furniture. We produce mood boards, detailed drawings, and site-ready finish schedules.",
        image:
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
        highlights: [
          "Space planning and FF&E",
          "Material and lighting palettes",
          "Joinery and finish detailing",
        ],
      },
      {
        slug: "2d-and-3d",
        title: "2D and 3D",
        summary:
          "Technical drawings, BIM models, and photoreal visualization for clearer decisions.",
        description:
          "Clients see the project before it is built. We produce coordinated 2D construction drawings, 3D models, walkthroughs, and presentation visuals that support approvals, marketing, and site execution.",
        image:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
        highlights: [
          "CAD and BIM documentation",
          "Photoreal stills and walkthroughs",
          "Design option studies",
        ],
      },
      {
        slug: "structural-strengthening-retrofitting",
        title: "Structural Strengthening and Retrofitting",
        summary:
          "Assessment and upgrade of existing structures for load, use, or seismic performance.",
        description:
          "We investigate existing buildings and infrastructure, then design strengthening with FRP, steel plating, section enlargement, jacketing, or foundation upgrade. Retrofit packages include method statements and site supervision.",
        image:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
        highlights: [
          "Condition and capacity assessment",
          "FRP, jacketing, and steel plating",
          "Change-of-use upgrades",
        ],
      },
      {
        slug: "substructure-specialist",
        title: "Substructure Specialist",
        summary:
          "Foundations, basements, retaining walls, and below-grade specialist design.",
        description:
          "Difficult ground, deep basements, and retaining structures need specialist attention. We design piled and raft foundations, waterproofed basements, shoring, and substructure sequencing with constructability in mind.",
        image:
          "https://images.unsplash.com/photo-1581094794329-adc7bb88c5d0?auto=format&fit=crop&w=1600&q=80",
        highlights: [
          "Piles, rafts, and basement boxes",
          "Shoring and retaining systems",
          "Waterproofing strategy",
        ],
      },
      {
        slug: "bill-of-quantity",
        title: "Bill of Quantity (BoQ)",
        summary:
          "Measured bills, cost plans, and tender documentation that keep procurement honest.",
        description:
          "Our quantity surveyors prepare detailed BoQs, cost estimates, and tender documents so clients can compare bids on a like-for-like basis and control variation during construction.",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
        highlights: [
          "Standard method of measurement",
          "Tender BoQs and cost plans",
          "Variation and valuation support",
        ],
      },
      {
        slug: "urban-planning",
        title: "Urban Planning",
        summary:
          "Masterplans, land-use frameworks, and neighborhood design for growing cities.",
        description:
          "We plan sites and districts: land use, circulation, open space, density, and infrastructure phasing. Urban planning packages support investment decisions, municipal approvals, and long-term development control.",
        image:
          "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1600&q=80",
        highlights: [
          "Masterplans and zoning studies",
          "Circulation and open-space design",
          "Phasing and infrastructure logic",
        ],
      },
      {
        slug: "water-works-design-supervision",
        title: "Water Works Design and Supervision",
        summary:
          "Water supply, treatment, and distribution design with construction supervision.",
        description:
          "From source works and treatment to reservoirs, pipelines, and last-mile distribution, we design water systems and supervise construction so communities and developments receive reliable, safe water.",
        image:
          "https://images.unsplash.com/photo-1521207418485-99c705420785?auto=format&fit=crop&w=1600&q=80",
        highlights: [
          "Supply, treatment, and networks",
          "Hydraulic modelling",
          "Pipeline and plant supervision",
        ],
      },
      {
        slug: "feasibility-study",
        title: "Feasibility Study",
        summary:
          "Technical, market, and financial studies that test whether a project should proceed.",
        description:
          "Before capital is committed, we study site conditions, demand, regulatory path, concept options, capex, and returns. The result is a clear go / no-go recommendation with a preferred development strategy.",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
        highlights: [
          "Market and site analysis",
          "Concept options and capex",
          "Risk and return briefing",
        ],
      },
    ],
  },
  {
    code: "02",
    slug: "technology-general-contractor",
    shortName: "TGC",
    title: "Technology General Contractor",
    accent: "Building, road, water, bridge, and specialist construction",
    summary:
      "End-to-end construction delivery for buildings, roads, water works, bridges, post-tension, and substructure.",
    description:
      "Technology General Contractor builds what the group designs — and what independent clients bring to us. We mobilise plant, skilled labour, and project controls for building, road, water, bridge, post-tension, and substructure construction.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2400&q=80",
    highlights: [
      "Licensed general contractor",
      "Plant, labour, and site systems",
      "Quality, HSE, and programme control",
    ],
    children: [
      {
        slug: "building-construction",
        title: "Building Construction",
        summary:
          "Turnkey construction of residential, commercial, and institutional buildings.",
        description:
          "We construct buildings from foundation to finishes: structure, envelope, MEP, and interiors. Project teams run look-ahead planning, quality inspections, and client reporting through practical completion.",
        image:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
        highlights: [
          "Structure to finishes",
          "MEP installation management",
          "Handover and defects liability",
        ],
      },
      {
        slug: "road-construction",
        title: "Road Construction",
        summary:
          "Earthworks, pavement, drainage, and road furniture for new and upgraded corridors.",
        description:
          "Our roads crews deliver cuttings, fills, pavement layers, asphalt, drainage, and signage. We manage traffic, materials testing, and compaction so the finished road meets specification.",
        image:
          "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1600&q=80",
        highlights: [
          "Earthworks and pavement",
          "Asphalt and drainage",
          "Materials testing on site",
        ],
      },
      {
        slug: "water-works-construction",
        title: "Water Works Construction",
        summary:
          "Construction of pipelines, reservoirs, treatment works, and distribution networks.",
        description:
          "We build water infrastructure: transmission mains, distribution networks, storage, and treatment civil works, with pressure testing, disinfection, and commissioning included.",
        image:
          "https://images.unsplash.com/photo-1521207418485-99c705420785?auto=format&fit=crop&w=1600&q=80",
        highlights: [
          "Pipelines and reservoirs",
          "Civil works for treatment",
          "Testing and commissioning",
        ],
      },
      {
        slug: "bridge-construction",
        title: "Bridge Construction",
        summary:
          "Substructure and superstructure construction for road and pedestrian bridges.",
        description:
          "Bridge delivery covers foundations, piers, abutments, decks, bearings, and finishes. We coordinate falsework, concrete quality, and safety for work over roads, rivers, and valleys.",
        image:
          "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1600&q=80",
        highlights: [
          "Foundations and substructure",
          "Deck and bearing installation",
          "Work-over-water safety systems",
        ],
      },
      {
        slug: "post-tension-construction",
        title: "Post Tension Construction",
        summary:
          "Installation, stressing, and grouting of post-tension systems on live sites.",
        description:
          "Specialist PT crews install ducts and tendons, support pours, stress to design elongation, and grout for durability. We work as a package contractor inside a main build or as a standalone PT contractor.",
        image:
          "https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=1600&q=80",
        highlights: [
          "Tendon installation",
          "Controlled stressing",
          "Grouting and sealing",
        ],
      },
      {
        slug: "substructure-construction",
        title: "Substructure Construction",
        summary:
          "Excavation, piling, basement boxes, and retaining construction.",
        description:
          "We construct below-grade works: bulk excavation, piling, rafts, basement walls, waterproofing, and backfill, with temporary works designed and installed for safe deep construction.",
        image:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
        highlights: [
          "Piling and rafts",
          "Basement construction",
          "Temporary works and shoring",
        ],
      },
    ],
  },
  {
    code: "03",
    slug: "finfine-real-estate",
    shortName: "Finfine",
    title: "Finfine Real Estate",
    accent: "Development and market services",
    summary:
      "Developing real estate and connecting buyers, sellers, and investors in the market.",
    description:
      "Finfine Real Estate develops residential and mixed-use property and operates as a market platform for listings, advisory, and transactions. We combine land, design, construction, and sales under one group.",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2400&q=80",
    highlights: [
      "In-house development pipeline",
      "Sales and market advisory",
      "Group design and build advantage",
    ],
    children: [
      {
        slug: "developing-real-estate",
        title: "Developing Real Estate",
        summary:
          "Land, concept, construction, and sales for new residential and mixed-use schemes.",
        description:
          "We identify sites, secure approvals, design with Sheger Architect, build with our contractor, and sell or lease finished homes and commercial space. Buyers get a single accountable developer.",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
        highlights: [
          "Site acquisition and concept",
          "Design-and-build delivery",
          "Sales, aftercare, and titles",
        ],
      },
      {
        slug: "real-estate-market",
        title: "Real Estate Market",
        summary:
          "Listings, valuation support, and transaction advisory for buyers and sellers.",
        description:
          "The Finfine market desk lists properties, matches buyers and sellers, and advises on pricing and neighbourhoods. Whether you are investing, relocating, or disposing of an asset, we make the market clearer.",
        image:
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80",
        highlights: [
          "Curated listings",
          "Buyer and seller matching",
          "Neighbourhood and pricing advice",
        ],
      },
    ],
  },
  {
    code: "04",
    slug: "export-import",
    shortName: "Trade",
    title: "Export and Import",
    accent: "Cash crops out. Construction materials in.",
    summary:
      "Exporting Ethiopian cash crops and importing construction materials for local projects.",
    description:
      "Our trade division moves value in both directions: premium cash crops from Ethiopian producers to international buyers, and construction materials from global mills and factories to Ethiopian sites.",
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=2400&q=80",
    highlights: [
      "Origin sourcing and quality control",
      "Import logistics for construction",
      "Documentation and compliance",
    ],
    children: [
      {
        slug: "cash-crop-exports",
        title: "Cash Crop Exports",
        summary:
          "Coffee, oilseeds, pulses, and spices sourced, graded, and exported from Ethiopia.",
        description:
          "We work with farmers and aggregators to source coffee, sesame, pulses, and spices, then handle grading, packing, documentation, and shipping to buyers who need consistent Ethiopian origin product.",
        image:
          "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1600&q=80",
        highlights: [
          "Coffee, sesame, pulses, spices",
          "Grading and export packing",
          "Buyer-ready documentation",
        ],
      },
      {
        slug: "construction-materials-imports",
        title: "Construction Materials Imports",
        summary:
          "Steel, finishes, sanitary, and specialist materials imported for Ethiopian construction.",
        description:
          "Projects stall when materials are late or off-spec. We import structural steel, finishing materials, sanitary ware, electrical goods, and specialist construction products, aligned to project schedules.",
        image:
          "https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=1600&q=80",
        highlights: [
          "Steel and finishing products",
          "Project-timed logistics",
          "Quality inspection on arrival",
        ],
      },
    ],
  },
  {
    code: "05",
    slug: "interior-design",
    shortName: "Interiors",
    title: "Interior Design",
    accent: "Spaces that work, and feel considered",
    summary:
      "A dedicated interior design studio for homes, workplaces, hospitality, and show suites.",
    description:
      "Interior Design is a standalone division for clients who need more than a finish schedule. We design, specify, procure, and install interiors — from private residences to offices, hotels, and Finfine show homes — with a material language that belongs in Ethiopian light.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=80",
    highlights: [
      "Concept to installation",
      "Residential and commercial",
      "Show-home and hospitality fit-out",
    ],
    children: [
      {
        slug: "residential-interiors",
        title: "Residential Interiors",
        summary: "Homes, apartments, and villas designed for daily life.",
        description:
          "We plan kitchens, living rooms, bedrooms, and outdoor rooms around how families actually live, with durable materials, storage, and lighting that feel generous rather than decorative for its own sake.",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
        highlights: [
          "Family-first space planning",
          "Joinery and kitchen design",
          "Soft furnishings and lighting",
        ],
      },
      {
        slug: "commercial-hospitality-interiors",
        title: "Commercial and Hospitality",
        summary: "Workplaces, lobbies, restaurants, and guest rooms.",
        description:
          "Commercial interiors must perform: acoustics, circulation, brand, and maintenance. We design offices, lobbies, F&B, and guest rooms that last on a busy floor and still feel distinctive.",
        image:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
        highlights: [
          "Workplace and lobby design",
          "F&B and guest-room concepts",
          "Durable, brand-led palettes",
        ],
      },
    ],
  },
];

export const projects = [
  {
    slug: "bole-horizon-residences",
    title: "Bole Horizon Residences",
    category: "Building",
    division: "finfine-real-estate",
    location: "Bole, Addis Ababa",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=80",
    summary: "A mid-rise residential development designed, built, and marketed in-house.",
  },
  {
    slug: "adama-corridor-upgrade",
    title: "Adama Corridor Upgrade",
    category: "Road",
    division: "technology-general-contractor",
    location: "Oromia",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=2000&q=80",
    summary: "Pavement reconstruction, drainage, and safety works on a regional corridor.",
  },
  {
    slug: "lideta-office-tower",
    title: "Lideta Office Tower",
    category: "Architecture",
    division: "sheger-architect",
    location: "Lideta, Addis Ababa",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80",
    summary: "Full architectural and structural package with post-tension floor plates.",
  },
  {
    slug: "awash-crossing-bridge",
    title: "Awash Crossing Bridge",
    category: "Bridge",
    division: "technology-general-contractor",
    location: "Afar / Oromia",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1477959858617-848d4d30e170?auto=format&fit=crop&w=2000&q=80",
    summary: "Multi-span road bridge with specialist substructure and deck works.",
  },
  {
    slug: "sidama-coffee-export",
    title: "Sidama Origin Export Programme",
    category: "Trade",
    division: "export-import",
    location: "Sidama",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=2000&q=80",
    summary: "Graded coffee lots prepared for European and Middle East buyers.",
  },
  {
    slug: "kazanchis-show-residence",
    title: "Kazanchis Show Residence",
    category: "Interior",
    division: "interior-design",
    location: "Kazanchis, Addis Ababa",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80",
    summary: "A fully fitted show home for Finfine sales, designed and installed by our interior studio.",
  },
];

export const listings = [
  {
    id: "FR-2408",
    title: "Horizon Two-Bedroom Apartment",
    type: "Apartment",
    status: "For sale",
    area: "Bole",
    size: "118 m²",
    price: "ETB 8.9M",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: "FR-2412",
    title: "Garden Villa, CMC",
    type: "Villa",
    status: "For sale",
    area: "CMC",
    size: "320 m²",
    price: "ETB 24.5M",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: "FR-2388",
    title: "Ground-Floor Retail, Mexico",
    type: "Commercial",
    status: "For lease",
    area: "Mexico",
    size: "86 m²",
    price: "ETB 85k / mo",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: "FR-2419",
    title: "Penthouse, Kazanchis",
    type: "Apartment",
    status: "For sale",
    area: "Kazanchis",
    size: "210 m²",
    price: "ETB 18.2M",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=80",
  },
];

export const processSteps = [
  {
    n: "01",
    title: "Listen and study",
    text: "Brief, site, and feasibility. We learn the constraint before we draw the solution.",
  },
  {
    n: "02",
    title: "Design with discipline",
    text: "Coordinated architecture, engineering, interiors, and cost so the idea can be built.",
  },
  {
    n: "03",
    title: "Build and supervise",
    text: "Construction, specialist packages, and resident engineers protecting quality on site.",
  },
  {
    n: "04",
    title: "Hand over and grow",
    text: "Titles, aftercare, trade supply, and the next phase of the same relationship.",
  },
];

export type FlatNode = ContentNode & {
  divisionSlug: string;
  divisionTitle: string;
  parentSlug?: string;
  parentTitle?: string;
  path: string[];
};

function flatten(
  nodes: ContentNode[],
  division: Division,
  parent?: ContentNode,
  path: string[] = [],
): FlatNode[] {
  return nodes.flatMap((node) => {
    const nextPath = [...path, node.slug];
    const self: FlatNode = {
      ...node,
      divisionSlug: division.slug,
      divisionTitle: division.title,
      parentSlug: parent?.slug,
      parentTitle: parent?.title,
      path: nextPath,
    };
    const kids = node.children
      ? flatten(node.children, division, node, nextPath)
      : [];
    return [self, ...kids];
  });
}

export function getFlatServices(list: Division[] = divisions): FlatNode[] {
  return list.flatMap((d) => flatten(d.children ?? [], d, d, [d.slug]));
}

export function getAllSlugs(list: Division[] = divisions): string[] {
  return [
    ...list.map((d) => d.slug),
    ...getFlatServices(list).map((s) => s.slug),
  ];
}

export function getDivision(slug: string, list: Division[] = divisions) {
  return list.find((d) => d.slug === slug);
}

export function getService(slug: string, list: Division[] = divisions) {
  return getFlatServices(list).find((s) => s.slug === slug);
}

export function getServiceOptions(list: Division[] = divisions) {
  return [
    ...list.map((d) => ({
      value: d.slug,
      label: d.title,
    })),
    ...getFlatServices(list).map((s) => ({
      value: s.slug,
      label: `${s.divisionTitle} — ${s.title}`,
    })),
  ];
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
