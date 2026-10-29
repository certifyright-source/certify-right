export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQ[] = [
  // Standard FAQs
  {
    id: "cdc-projects",
    category: "CDC",
    question: "What types of projects require a Complying Development Certificate (CDC)?",
    answer:
      "A CDC can be used for many standard residential projects — new dwellings, alterations and additions, granny flats, swimming pools, garages, carports and demolition — provided they comply with the relevant State Environmental Planning Policy (SEPP). Eligibility depends on your site, zoning and design. We assess your project and give you a clear answer upfront.",
  },
  {
    id: "appoint-certifier",
    category: "General",
    question: "Can I appoint my own certifier?",
    answer:
      "Yes. In NSW, you can appoint a registered private certifier — like Certify Right — as your Principal Certifier for most development projects. Appointing your own certifier means you choose who manages your inspections and certification, rather than having one assigned by council. It also tends to be faster and gives you direct access to your certifier throughout the project.",
  },
  {
    id: "cdc-vs-da",
    category: "CDC",
    question: "What is the difference between a CDC and a DA?",
    answer:
      "A Development Application (DA) is assessed by council. It suits most development but can take weeks or months, involves public notification, and is subject to council conditions. A Complying Development Certificate (CDC) is issued by a private certifier and bypasses council — significantly faster, but only where the project strictly meets the SEPP code requirements. We can advise which pathway suits your project.",
  },
  {
    id: "after-cc",
    category: "General",
    question: "What happens after I receive a Construction Certificate?",
    answer:
      "Construction can commence, provided a Principal Certifier has been appointed. Mandatory critical stage inspections are then carried out at specified points — such as before footings are poured, at frame stage and at completion. After a satisfactory final inspection, an Occupation Certificate is issued confirming the building is safe and legal to occupy.",
  },
  {
    id: "how-many-inspections",
    category: "General",
    question: "How many inspections do I need?",
    answer:
      "The number and type of inspections depends on your project and the type of approval. For most residential new builds, mandatory critical stage inspections include: commencement inspection (before footings are poured), frame inspection, wet areas inspection, and final inspection before the Occupation Certificate. Additional inspections may be required depending on the scope of work. We identify all required inspections at the outset and keep you informed throughout the project.",
  },
  {
    id: "fire-safety-cert",
    category: "General",
    question: "What is a Fire Safety Certificate?",
    answer:
      "A Fire Safety Certificate confirms a building's essential fire safety measures comply with the relevant standards. It is typically required for the Occupation Certificate on certain building classes and must be lodged with council. Owners of applicable buildings must also maintain fire safety measures and lodge Annual Fire Safety Statements (AFSS) each year. We assist with AFSS, Fire Safety Schedules, essential fire safety measures and compliance reviews.",
  },
  {
    id: "how-long",
    category: "General",
    question: "How long does certification take?",
    answer:
      "It depends on the certificate type and how complete your documentation is. A CDC can typically be issued within 10–20 business days of a complete application, depending on project complexity. A Construction Certificate follows a similar timeframe once all plans and specifications are submitted. We aim to turn things around quickly and keep you informed throughout.",
  },
  // Top 10 questions clients actually ask
  {
    id: "cdc-vs-da-qualify",
    category: "CDC",
    question: "How do I know if my project qualifies for a CDC instead of a DA?",
    answer:
      "This is one of the first things we work out for you. CDC eligibility depends on your site's zoning, the type of development, and whether the design meets the relevant SEPP — including lot size, setbacks, height and site constraints. Send us your address and a brief description of your plans, and we will give you a straight answer.",
  },
  {
    id: "what-pc-does",
    category: "General",
    question: "What does a Principal Certifier actually do?",
    answer:
      "The Principal Certifier (PC) is legally responsible for overseeing the certification of your project. They issue the Construction Certificate (or confirm the CDC), conduct mandatory critical stage inspections, and issue the Occupation Certificate. The PC is not the builder or designer — they check the work is done correctly at key points. You must appoint a PC before construction starts.",
  },
  {
    id: "critical-stage-inspection",
    category: "General",
    question: "What is a Critical Stage Inspection?",
    answer:
      "A Critical Stage Inspection (CSI) is a mandatory inspection at specific points during construction, prescribed under NSW legislation. For a standard dwelling, these typically include before footings are poured, frame stage, wet areas before lining, and a final inspection. Your Principal Certifier schedules and conducts them. Missing a required CSI can delay your Occupation Certificate.",
  },
  {
    id: "plans-not-final",
    category: "General",
    question: "My plans aren't finalised yet — can I still contact you?",
    answer:
      "Absolutely — getting us involved early is often the best approach. We provide preliminary planning advice, CDC vs DA guidance, site constraints reviews and pre-lodgement advice, so you understand what is achievable before investing significant time and money. Call or email us with what you are planning and we will give you practical feedback.",
  },
  {
    id: "cdc-documents",
    category: "CDC",
    question: "What documents do I need to apply for a CDC?",
    answer:
      "A typical CDC application includes an application form, site plan, floor plans and elevations, a BASIX Certificate (for residential projects), a Statement of Environmental Effects, and a survey/site analysis. Requirements vary by project, so we give you a clear checklist at the start. Incomplete applications are the most common cause of delays.",
  },
  {
    id: "same-certifier",
    category: "General",
    question: "Can I use the same certifier for my CDC and my OC?",
    answer:
      "Yes — and it is usually the most efficient approach. When Certify Right issues your CDC and also acts as your Principal Certifier, we already know your project, the approval conditions, and the inspection requirements from the beginning. There is no handover, no learning curve, and no gaps in the process. We stay with your project from approval through to Occupation Certificate.",
  },
  {
    id: "failed-inspection",
    category: "General",
    question: "What happens if my building fails an inspection?",
    answer:
      "We document the issues clearly and provide a defect notice specifying what needs to be rectified. Work can continue in unaffected areas, but the specific issues must be fixed before that stage can pass. We work with builders to resolve issues quickly so the project keeps moving — a failed inspection is the system working as intended.",
  },
  {
    id: "pool-granny-flat",
    category: "General",
    question: "Do I need a certifier for a swimming pool or granny flat?",
    answer:
      "Yes — both require certification in NSW. A new pool needs building approval (CDC or DA/CC) and a pool barrier compliance certificate. A granny flat is most commonly approved through a CDC, provided the site and design meet the SEPP requirements. We handle both and can advise on the approval and inspection requirements for your project.",
  },
  {
    id: "what-is-complying-dev",
    category: "CDC",
    question: "What is a Complying Development, and does my project qualify?",
    answer:
      "Complying Development is pre-approved under State legislation — if your project strictly meets the code requirements, it qualifies for a CDC without a council DA. The codes cover many standard residential projects, with specific requirements for site area, setbacks, height, heritage and flood constraints. Contact us and we will assess eligibility quickly.",
  },
  {
    id: "how-soon",
    category: "General",
    question: "How soon can I get started?",
    answer:
      "We aim to respond to all enquiries within 24 hours and provide a prompt quote. Once engaged, we start the assessment straight away; from there, speed depends on how complete your documentation is — which is why we provide a clear checklist upfront. Call 0423 925 514 or email info@certifyright.com.au.",
  },
  {
    id: "package-review",
    category: "General",
    question: "Can you review my documents before I lodge?",
    answer:
      "Yes. Incomplete or non-compliant documentation is one of the biggest causes of delays. Before lodgement, we review approval packages — including architectural plans, BASIX Certificates, structural engineering, stormwater designs, flood and bushfire reports, geotechnical reports, waste management plans, fire safety documentation and specialist consultant reports. Identifying issues early helps reduce delays, redesign costs and requests for additional information.",
  },
  {
    id: "planning-portal",
    category: "General",
    question: "Can you help me with the NSW Planning Portal?",
    answer:
      "Yes. We work with the NSW Planning Portal every day. We can help you understand CDC and DA pathways, portal lodgements, requests for additional information, referral processes, required documentation, and approval sequencing and timeframes — helping you avoid common delays.",
  },
  {
    id: "consultant-connections",
    category: "General",
    question: "Can you recommend architects, engineers or other consultants?",
    answer:
      "Yes. Through our industry network, we can connect you with experienced architects, town planners, structural and stormwater engineers, hydraulic consultants, fire safety practitioners, building designers, accredited energy assessors, surveyors and specialist consultants. Certify Right remains independent in its certification role, so you get access to trusted professionals while keeping the independence expected of a certifier.",
  },
];

export const homepageFAQs = faqs.slice(0, 6);
