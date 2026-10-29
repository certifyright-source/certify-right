export interface Service {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  longDescription: string;
  features: string[];
  whoIsItFor: string[];
  process: string[];
  icon: string;
  banner: string;
  featured?: boolean;
}

export const services: Service[] = [
  {
    id: "complying-development-certificate",
    slug: "complying-development-certificate",
    title: "Complying Development Certificate (CDC)",
    shortTitle: "CDC",
    tagline: "Fast-track approval for eligible residential projects — no council required.",
    description:
      "A Complying Development Certificate (CDC) is the fastest path to building approval for eligible projects. Skip the council DA process entirely and get your approval from a registered private certifier.",
    longDescription: `A CDC is a combined planning and construction approval issued by a private certifier instead of council — significantly faster for eligible projects.

Your project must comply with the State Environmental Planning Policy (SEPP) — Exempt and Complying Development Codes. Many residential builds, alterations, additions, granny flats and demolition works qualify.

We review your plans against the relevant codes upfront. If your project qualifies, we handle the assessment and issue your CDC efficiently — so you can start sooner.

Fadi Habbouche is a NSW Fair Trading Registered Building Surveyor (Class A3, BDC2868) with 15+ years of industry experience.`,
    features: [
      "No council lodgement required — faster approval pathway",
      "Thorough assessment against SEPP Complying Development Codes",
      "Plain-English advice on whether your project qualifies",
      "Combined planning and construction approval in a single certificate",
      "Issued by a NSW Fair Trading Registered Building Surveyor",
      "Covers residential builds, alterations, additions, granny flats and more",
    ],
    whoIsItFor: [
      "Homeowners building new residences or extensions",
      "Builders and developers on eligible residential projects",
      "Granny flat companies seeking fast approvals",
      "Anyone wanting to avoid the council DA process",
    ],
    process: [
      "Contact Fadi with your project details and site address",
      "We assess eligibility against the SEPP Complying Development Codes",
      "You submit your plans and required documentation",
      "We carry out the formal assessment and issue your CDC",
      "Construction can commence — with inspections scheduled as required",
    ],
    icon: "FileCheck",
    banner: "/images/services/cdc.webp",
    featured: true,
  },
  {
    id: "construction-certificate",
    slug: "construction-certificate",
    title: "Construction Certificate (CC)",
    shortTitle: "Construction Certificate",
    tagline: "Approval to commence construction — confirms your plans meet the Building Code.",
    description:
      "A Construction Certificate confirms your construction plans and specifications comply with the Building Code of Australia (BCA/NCC) and any relevant development consent conditions. It is required before building work can commence.",
    longDescription: `Once council approves your development consent (DA), you need a Construction Certificate before building work can start. The CC confirms your construction plans and specifications comply with the BCA/NCC and your DA conditions.

A CC can be issued by council or a private certifier. A private certifier is generally faster and gives you direct access to the person reviewing your plans.

We assess your documentation, identify issues early and help resolve them before issuing — so there are no surprises on site.`,
    features: [
      "Review of construction plans and specifications for BCA/NCC compliance",
      "Assessment of DA conditions and how they apply to your design",
      "Clear identification of any compliance issues before issuing",
      "Issued by a NSW Fair Trading Registered Building Surveyor",
      "Fast turnaround to keep your project on schedule",
      "Ongoing support through the construction phase",
    ],
    whoIsItFor: [
      "Property owners with a council-approved DA",
      "Builders requiring certification before commencing work",
      "Developers at the construction-ready stage",
      "Anyone needing BCA/NCC compliance confirmation",
    ],
    process: [
      "Provide your DA approval and construction documents",
      "We review plans and specs for BCA/NCC compliance and DA conditions",
      "Any issues are identified and communicated clearly",
      "Once satisfied, we issue your Construction Certificate",
      "Inspections are scheduled at critical stages during construction",
    ],
    icon: "HardHat",
    banner: "/images/services/construction-certificate.webp",
  },
  {
    id: "occupation-certificate",
    slug: "occupation-certificate",
    title: "Occupation Certificate (OC)",
    shortTitle: "Occupation Certificate",
    tagline: "The final sign-off confirming your building is safe and legal to occupy.",
    description:
      "An Occupation Certificate is the final step in the certification process. It confirms that your building has been constructed in accordance with the relevant approval and is safe and suitable for occupation.",
    longDescription: `An Occupation Certificate (OC) is issued when a building project is complete. It confirms the building was constructed in accordance with the relevant approval — CDC or DA/CC — and is safe and fit to occupy.

You cannot legally occupy a new building or completed extension without an OC. It is only issued once all required critical stage inspections are satisfactorily completed and any outstanding issues are resolved.

We manage the inspection process from start to finish and help you address issues promptly.`,
    features: [
      "Final confirmation that your building is safe and legal to occupy",
      "Issued only after all required inspections are completed",
      "Clear communication throughout the inspection process",
      "Prompt identification and resolution of any outstanding issues",
      "Covers new builds, extensions, alterations, and CDC projects",
      "Issued by a NSW Fair Trading Registered Building Surveyor",
    ],
    whoIsItFor: [
      "Homeowners completing a new residence or extension",
      "Builders at practical completion stage",
      "Developers requiring final sign-off across multiple dwellings",
      "Anyone needing legal authority to occupy a building",
    ],
    process: [
      "All required critical stage inspections are completed",
      "Any defects or issues identified are communicated and addressed",
      "Final inspection confirms compliance with the relevant approval",
      "Occupation Certificate is issued",
      "You have legal authority to occupy your building",
    ],
    icon: "CheckCircle2",
    banner: "/images/services/occupation-certificate.webp",
  },
  {
    id: "principal-certifier-appointment",
    slug: "principal-certifier-appointment",
    title: "Principal Certifier Appointment",
    shortTitle: "Principal Certifier",
    tagline: "Your legally required certification supervisor — from first inspection to final certificate.",
    description:
      "Under the Environmental Planning and Assessment Act, a Principal Certifier (PC) must be appointed for all development projects requiring certification. Certify Right can act as your Principal Certifier, managing the full inspection and certification process.",
    longDescription: `Under NSW law, a Principal Certifier must be appointed for any development that requires certification. The Principal Certifier conducts critical stage inspections, confirms the building is constructed in accordance with the approval, and issues the Occupation Certificate.

Appointing Certify Right gives you direct access to Fadi Habbouche, a Registered Building Surveyor who responds promptly and keeps you informed.

We handle documentation, inspection scheduling, compliance monitoring and final certification — so you can focus on building.`,
    features: [
      "Legally required appointment under NSW building legislation",
      "Coordination of all required critical stage inspections",
      "Direct access to a NSW Registered Building Surveyor",
      "Compliance monitoring throughout the construction phase",
      "Clear and responsive communication at every stage",
      "Issuing the final Occupation Certificate",
    ],
    whoIsItFor: [
      "Owners and builders on any certifiable development",
      "Projects requiring inspections at critical construction stages",
      "Anyone wanting a responsive, experienced certifier on their project",
      "CDC and CC projects requiring a Principal Certifier",
    ],
    process: [
      "You appoint Certify Right as your Principal Certifier at the outset",
      "We review the approval and identify all required inspections",
      "Critical stage inspections are scheduled and conducted",
      "Any compliance issues are communicated and followed up",
      "Final inspection completed and Occupation Certificate issued",
    ],
    icon: "ClipboardCheck",
    banner: "/images/services/principal-certifier.webp",
  },
  {
    id: "bca-ncc-compliance",
    slug: "bca-ncc-compliance",
    title: "BCA & NCC Compliance Reports",
    shortTitle: "BCA & NCC Compliance",
    tagline: "Practical compliance advice from the earliest stages of design — fewer redesigns and delays.",
    description:
      "Building Code of Australia (BCA) and National Construction Code (NCC) compliance reviews and advice from the earliest stages of design — identifying issues before submission to reduce costly redesigns and approval delays.",
    longDescription: `We provide practical Building Code of Australia (BCA) and National Construction Code (NCC) compliance advice from the earliest stages of design.

Our assessments help identify potential compliance issues before submission, reducing costly redesigns and approval delays.

We work closely with designers and consultants to find practical compliance outcomes.`,
    features: [
      "BCA compliance reviews",
      "NCC assessments",
      "Alternative solution coordination",
      "Design compliance advice",
      "Performance requirement guidance",
      "Building regulation interpretation",
    ],
    whoIsItFor: [
      "Architects and designers checking compliance before lodgement",
      "Builders seeking clarification on BCA/NCC requirements",
      "Developers and consultants at the early design stage",
      "Anyone needing practical compliance guidance on their design",
    ],
    process: [
      "Submit your design documents and project details",
      "We review the design against the relevant BCA/NCC provisions",
      "Compliance issues and practical solutions are identified",
      "Clear written advice is provided",
      "We work with your designers and consultants as the design is refined",
    ],
    icon: "BookOpen",
    banner: "/images/services/bca-ncc.webp",
  },
  {
    id: "da-support",
    slug: "da-support",
    title: "Development & Approval Support",
    shortTitle: "Development & Approvals",
    tagline: "Practical direction early — understand what is achievable before you invest time and money.",
    description:
      "Preliminary planning advice, approval pathway reviews, CDC vs DA guidance and pre-lodgement support — so you understand what is achievable before investing significant time and money.",
    longDescription: `Not every project starts with a building approval. Many clients require guidance before engaging architects or consultants.

We help you understand what is achievable on your site, which approval pathway suits your project, and what is needed before lodgement.

Our goal is to provide practical direction early, helping clients understand what is achievable before investing significant time and money.`,
    features: [
      "Preliminary planning advice",
      "Approval pathway reviews",
      "Development feasibility assessments",
      "CDC versus DA guidance",
      "Site constraints reviews",
      "Pre-lodgement advice",
      "Statement of Environmental Effects (SEE) preparation assistance",
      "General approval strategy advice",
    ],
    whoIsItFor: [
      "Homeowners considering buying, designing or developing a property",
      "Architects and designers preparing submissions",
      "Builders and developers assessing feasibility before lodgement",
      "Anyone unsure which approval pathway applies to their project",
    ],
    process: [
      "Tell us about your site and what you are planning",
      "We review site constraints and the available approval pathways",
      "We advise on feasibility and the best route — CDC or DA",
      "We outline the documentation needed before lodgement",
      "You proceed with clear direction and fewer surprises",
    ],
    icon: "FileText",
    banner: "/images/services/da-support.webp",
  },
  {
    id: "demolition-certificate",
    slug: "demolition-certificate",
    title: "Demolition Certificate",
    shortTitle: "Demolition",
    tagline: "Fast-track demolition certification where eligible — required before the new build begins.",
    description:
      "Demolition certificates for eligible projects under the Complying Development pathway. Required before demolition commences — we assess eligibility and issue your certificate efficiently.",
    longDescription: `Demolishing a structure in NSW requires approval. For eligible works, a private certifier can issue a Complying Development Certificate for demolition — a faster alternative to council approval.

We assess eligibility under the relevant SEPP, handle the required documentation and issue your certificate promptly.

We also coordinate with relevant authorities and identify any asbestos management requirements — avoiding delays to your next stage of construction.`,
    features: [
      "Assessment of eligibility for CDC demolition pathway",
      "Faster than council lodgement for eligible projects",
      "Identification of asbestos management requirements",
      "Coordination with relevant authorities",
      "Required documentation handled efficiently",
      "Supports timely commencement of subsequent construction",
    ],
    whoIsItFor: [
      "Homeowners demolishing structures before a new build",
      "Builders requiring demolition approval before commencing works",
      "Developers clearing existing structures on site",
      "Anyone seeking a faster alternative to council demolition approval",
    ],
    process: [
      "Submit site and structure details for eligibility assessment",
      "We review eligibility under the relevant SEPP",
      "Required documentation and asbestos assessment identified",
      "Certificate issued once documentation is complete",
      "Demolition can proceed; subsequent construction certification arranged",
    ],
    icon: "Building2",
    banner: "/images/services/demolition.webp",
  },
  {
    id: "swimming-pool-compliance",
    slug: "swimming-pool-compliance",
    title: "Swimming Pool Compliance",
    shortTitle: "Swimming Pool",
    tagline: "Pool barrier inspections and compliance certificates for NSW residential properties.",
    description:
      "Swimming pool barrier inspections and compliance certificates for NSW residential properties. Required under the Swimming Pools Act 1992 — we make the process straightforward.",
    longDescription: `Under the NSW Swimming Pools Act 1992, residential pools and spas must have a compliant child-resistant barrier. Owners need a compliance certificate when selling or leasing a property with a pool, and must register the pool on the NSW Swimming Pool Register.

We inspect the barrier against the relevant Australian Standards and legislation, then either issue your compliance certificate or provide a clear deficiency report showing exactly what needs to be rectified.`,
    features: [
      "Pool barrier inspection under the Swimming Pools Act 1992",
      "Compliance certificate issued for compliant barriers",
      "Clear deficiency report for non-compliant barriers",
      "Assessment against relevant Australian Standards",
      "Required for property sale and rental",
      "NSW Swimming Pool Register assistance",
    ],
    whoIsItFor: [
      "Homeowners selling or leasing a property with a pool",
      "Property owners ensuring ongoing pool barrier compliance",
      "Builders completing new pool installations",
      "Anyone requiring a pool compliance certificate in NSW",
    ],
    process: [
      "Book a pool barrier inspection at your property",
      "We inspect the barrier against the Swimming Pools Act and Australian Standards",
      "Compliant pools receive a compliance certificate",
      "Non-compliant pools receive a detailed deficiency report",
      "Re-inspection arranged once rectifications are complete",
    ],
    icon: "Waves",
    banner: "/images/services/swimming-pool.webp",
  },
  {
    id: "building-inspections",
    slug: "building-inspections",
    title: "Building Inspections",
    shortTitle: "Building Inspections",
    tagline: "Critical-stage inspections at every required point — so nothing is missed and your OC is never held up.",
    description:
      "Critical stage building inspections throughout the construction process. Required at specified stages of construction — we conduct thorough, responsive inspections that keep your project on track.",
    longDescription: `Critical stage inspections are mandatory in NSW. They are conducted at set stages — such as before footings are poured, at frame stage and at practical completion — to confirm the work complies with the approval and the Building Code.

We inspect thoroughly at every required stage, respond promptly to bookings, and work with builders and owners to resolve issues quickly.

Fadi's civil engineering background brings practical, on-site knowledge to complex or unusual situations.`,
    features: [
      "All mandatory critical stage inspections conducted",
      "Prompt scheduling and responsive communication",
      "Detailed inspection reports issued after each stage",
      "Clear identification of any defects or compliance issues",
      "Experience across residential, commercial and mixed-use buildings",
      "Civil engineering background adds depth to technical assessments",
    ],
    whoIsItFor: [
      "Builders requiring inspections at mandatory construction stages",
      "Owners monitoring their building project",
      "Anyone appointed with Certify Right as Principal Certifier",
      "Projects requiring independent inspection under a CDC or CC",
    ],
    process: [
      "Inspections are booked at the required construction stages",
      "We attend site and carry out a thorough compliance assessment",
      "Inspection report is issued promptly after each visit",
      "Any defects or issues are clearly communicated",
      "Follow-up inspections arranged as needed",
    ],
    icon: "Search",
    banner: "/images/services/building-inspections.webp",
  },
  {
    id: "fire-safety",
    slug: "fire-safety",
    title: "Fire Safety & AFSS Support",
    shortTitle: "Fire Safety & AFSS",
    tagline: "Annual Fire Safety Statements, fire safety schedules and compliance support for NSW buildings.",
    description:
      "Annual Fire Safety Statements (AFSS), Fire Safety Schedules, essential fire safety measures and compliance advice for NSW building owners and property managers.",
    longDescription: `Fire safety requirements can be complex for building owners and property managers.

Our fire safety experience helps us understand the technical and regulatory requirements for maintaining compliant buildings.

We assess fire safety measures, identify deficiencies, and give clear advice on what is needed to achieve and maintain compliance.`,
    features: [
      "Annual Fire Safety Statements (AFSS)",
      "Fire Safety Schedules",
      "Essential Fire Safety Measures",
      "Fire safety compliance reviews",
      "Existing building assessments",
      "Regulatory compliance advice",
    ],
    whoIsItFor: [
      "Building owners with annual fire safety obligations",
      "Strata managers and owners corporations",
      "Developers and builders assessing fire safety requirements",
      "Anyone needing practical fire safety compliance advice",
    ],
    process: [
      "Contact us with your fire safety requirements",
      "We assess your building's fire safety measures",
      "Deficiencies and required actions are clearly identified",
      "Support provided for Annual Fire Safety Statement lodgement",
      "Ongoing advice available as required",
    ],
    icon: "Flame",
    banner: "/images/services/fire-safety.webp",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getFeaturedService(): Service {
  return services.find((s) => s.featured) || services[0];
}
