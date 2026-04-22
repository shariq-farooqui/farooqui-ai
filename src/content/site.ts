export const SITE = {
  brand: 'farooqui.ai',
  email: 'shariq.farooqui@outlook.com',
  linkedin: 'https://linkedin.com/in/shariqfarooqui',
  recommendationsUrl:
    'https://www.linkedin.com/in/shariqfarooqui/details/recommendations/?detailScreenTabIndex=0',
  github: 'https://github.com/shariq-farooqui',
  bookingUrl: 'https://cal.eu/shariq/30min',
  // Public URL to the CV PDF. Leave empty to hide the Contact link.
  cvUrl: '',
  kicker: 'Available to consult individuals and SMEs',
  tagline: 'Building LLM systems that survive audit, evals, and real users.',
  consultancyIntro:
    'Most AI features stall between \u2018working demo\u2019 and \u2018in production.\u2019 I\u2019ve worked on that gap in finance, e-commerce, and regulated compliance, and I can help you do it faster.',
} as const;

export interface Service {
  num: string;
  name: string;
  blurb: string;
  deliverable: string;
  tempo: string;
}

export const SERVICES: readonly Service[] = [
  {
    num: '01',
    name: 'AI Audit',
    blurb:
      'A short, hands-on review of an existing or planned AI feature. I look at the data, the pipeline, the evals, and the production risks, and come back with a prioritised list of what to fix and what to build.',
    deliverable: 'Written report \u00B7 architecture sketch \u00B7 prioritised next steps',
    tempo: '1\u20132 weeks',
  },
  {
    num: '02',
    name: 'Full Build',
    blurb:
      'End-to-end: scoping, data ingestion, retrieval or agent pipeline, eval harness, deployment on your infrastructure. Delivered by me, documented well enough that your team can own it after handover.',
    deliverable: 'Production system \u00B7 evals in CI \u00B7 docs \u00B7 handover call',
    tempo: '4\u201312 weeks',
  },
  {
    num: '03',
    name: 'Ongoing Support',
    blurb:
      "After a build ships, I can stay on for a few hours a week: monitoring, regression gates, model upgrades, and tuning retrieval as the corpus grows. For systems you depend on but don't want to babysit.",
    deliverable: 'Priority support \u00B7 regression gates \u00B7 monthly review',
    tempo: 'Month by month',
  },
  {
    num: '04',
    name: 'Workshops & Training',
    blurb:
      'Half-day and full-day sessions for engineering teams: practical AI engineering, eval design, retrieval, and agent loops. Hands-on, no slide-heavy theatre. Remote or on-site in the UK.',
    deliverable: 'Session materials \u00B7 exercises \u00B7 recording \u00B7 follow-up Q&A',
    tempo: 'Half day \u2013 2 days',
  },
];

export interface WorkItem {
  yr: string;
  title: string;
  at: string;
  tag: string;
  sum: string;
  chips: readonly string[];
}

export const WORK: readonly WorkItem[] = [
  {
    yr: '2026',
    title: 'EU Regulation Compliance Platform',
    at: 'at Pimberly \u00D7 Essex KTP',
    tag: 'Compliance',
    sum: 'Sole engineer on an end-to-end compliance platform covering the full lifecycle: VLM-OCR ingestion of regulatory PDFs, structured extraction with field-level confidence, a reviewer-facing audit trail, and Digital Product Passport generation for the EU ESPR. Also designing the evaluation harness for a comparative study of open-source LLMs on compliance extraction.',
    chips: ['VLM-OCR', 'Structured extraction', 'Evals', 'ESPR / DPP'],
  },
  {
    yr: '2026',
    title: 'Dynamic On-Demand MicroVM Decoy Deployment',
    at: 'IEEE CSR 2026 \u00B7 first-author paper',
    tag: 'Accepted',
    sum: 'Firecracker-based honeypot isolation with per-attacker VMs. 242 ms median startup, 106 MB memory footprint, zero overhead for legitimate users, validated at 100 concurrent sessions. First IEEE publication.',
    chips: ['Firecracker', 'Systems security', 'Honeypots', 'Academic'],
  },
  {
    yr: '2024\u201325',
    title: 'RAG Financial Chatbot on WhatsApp',
    at: 'at Elixir Equities',
    tag: 'Fintech',
    sum: 'Senior-most developer leading the in-house team that shipped an AI-driven personal finance platform. Designed the intent + entity pipeline, built RAG over financial regs and product data, and set up daily pipelines, observability (Loki / Grafana) and automated conversation testing.',
    chips: ['RAG', 'WhatsApp', 'Structured outputs', 'Grafana stack'],
  },
  {
    yr: '2022\u201324',
    title: 'Negotiation NLU \u2192 LLM Migration',
    at: 'at Nibble Technology',
    tag: 'E-commerce',
    sum: 'Migrated an e-commerce negotiation chatbot from rule-based NLU to LLM-driven generation in production, versioning models against each other. Implemented an academic negotiation strategy for live pricing, and designed a generic agent layer over the existing NLU.',
    chips: ['NLU', 'LLM migration', 'Agent design', 'E-commerce'],
  },
];

export interface Quote {
  name: string;
  role: string;
  ctx: string;
  text: string;
  linkedin: string;
}

export const QUOTES: readonly Quote[] = [
  {
    name: 'Varun Mehta',
    role: 'Founder, PaisaSmart (Elixir Equities)',
    ctx: 'Managed directly \u00B7 January 2025',
    text: 'Shariq consistently demonstrated outstanding technical expertise, strong problem-solving capabilities, and an unwavering dedication to excellence. He made significant contributions to the development and optimisation of our AI stack.',
    linkedin: 'https://www.linkedin.com/in/varun-mehta-paisasmart',
  },
  {
    name: 'Sam Lunn',
    role: 'CTO, Nibble',
    ctx: 'Managed directly \u00B7 January 2024',
    text: 'Shariq consistently displayed great abilities and attitude. Smart, friendly, always looking to learn, and supports his fellow developers with good advice. Very knowledgeable and capable with generative LLMs. A pleasure to work with, highly recommended.',
    linkedin: 'https://www.linkedin.com/in/samlunn',
  },
  {
    name: 'Jamie Ettedgui',
    role: 'Co-Founder, Nibble',
    ctx: 'Worked alongside \u00B7 January 2024',
    text: "A reliable and valuable team member. Shariq's positive attitude, strong loyalty, and excellent technical skills in AI are invaluable. His technical expertise contributes significantly to the success of our product.",
    linkedin: 'https://www.linkedin.com/in/jamieettedgui',
  },
];

export interface Post {
  dt: string;
  ti: string;
  rd: string;
  href?: string;
}

// Writing section renders nothing when this array is empty.
// Drop real posts in when they're published and the section reappears.
export const POSTS: readonly Post[] = [];
