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
      "A CDC can be used for a wide range of standard residential projects — including new single dwellings, alterations and additions, granny flats (secondary dwellings), swimming pools, garages, carports, and demolition works — provided they comply with the relevant State Environmental Planning Policy (SEPP). Not all projects qualify; eligibility depends on the specific site, zoning, and design. We assess your project against the SEPP requirements and give you a clear answer upfront.",
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
      "A Development Application (DA) is lodged with and assessed by your local council. It can be used for most types of development but can take weeks or months, involves public notification periods, and is subject to council conditions. A Complying Development Certificate (CDC) is issued by a private certifier and bypasses the council process entirely — making it significantly faster for eligible projects. The trade-off is that CDCs can only be issued where the project strictly meets the SEPP code requirements. We can advise you which pathway suits your project.",
  },
  {
    id: "after-cc",
    category: "General",
    question: "What happens after I receive a Construction Certificate?",
    answer:
      "Once your Construction Certificate is issued, construction can commence. You must have appointed a Principal Certifier before work starts. During construction, mandatory critical stage inspections are required at specified points — such as before footings are poured, at frame stage, and at practical completion. Your Principal Certifier coordinates these. At the end of the project, a final inspection is conducted and, if satisfied, an Occupation Certificate is issued confirming the building is safe and legal to occupy.",
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
      "A Fire Safety Certificate is a document confirming that all essential fire safety measures in a building comply with the relevant standards. It is typically required as part of the Occupation Certificate process for certain classes of buildings, and must be lodged with council. Building owners of applicable buildings also have ongoing obligations to maintain fire safety measures and lodge Annual Fire Safety Statements (AFSS) each year. Certify Right assists with AFSS, Fire Safety Schedules, essential fire safety measures and compliance reviews.",
  },
  {
    id: "how-long",
    category: "General",
    question: "How long does certification take?",
    answer:
      "Timeframes vary depending on the type of certificate and the completeness of your documentation. A CDC can typically be issued within 10–20 business days from receipt of a complete application, though this depends on the complexity of the project and the documentation provided. A Construction Certificate follows a similar timeframe once all plans and specifications are submitted. We aim to turn things around as quickly as possible and keep you informed of progress throughout.",
  },
  // Top 10 questions clients actually ask
  {
    id: "cdc-vs-da-qualify",
    category: "CDC",
    question: "How do I know if my project qualifies for a CDC instead of a DA?",
    answer:
      "This is one of the first things we work out for you. Eligibility for a CDC depends on your site's zoning, the type of development, and whether the proposed design meets all the requirements of the relevant SEPP (State Environmental Planning Policy). Things like lot size, setbacks, height, and site constraints all factor in. Contact us with your address and a brief description of what you are planning — we will give you a straight answer on whether CDC is available for your project.",
  },
  {
    id: "what-pc-does",
    category: "General",
    question: "What does a Principal Certifier actually do?",
    answer:
      "The Principal Certifier (PC) is the person legally responsible for overseeing the certification of your building project. They issue the Construction Certificate (or confirm the CDC), conduct mandatory critical stage inspections during construction, and issue the Occupation Certificate at the end. Think of the PC as the compliance referee for your build — they are not the builder or the designer, but they check that everything is done correctly at key points. You must appoint a PC before construction starts.",
  },
  {
    id: "critical-stage-inspection",
    category: "General",
    question: "What is a Critical Stage Inspection?",
    answer:
      "A Critical Stage Inspection (CSI) is a mandatory inspection that must be carried out at specific points during construction. These are prescribed under NSW legislation and vary depending on the type of building. For a standard residential dwelling, they typically include inspections before footings are poured, at frame stage, before lining goes on wet areas, and a final inspection at completion. Your Principal Certifier schedules and conducts these. Missing a required CSI can result in compliance issues and delay your Occupation Certificate.",
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
      "A typical CDC application includes a completed application form, site plan, floor plans and elevations, a BASIX Certificate (for residential projects), a Statement of Environmental Effects, and a survey/site analysis. The exact requirements depend on your project type. We provide you with a clear document checklist at the start of the process so nothing is missed. Incomplete applications are the most common source of delays — we work with you upfront to make sure your submission is complete.",
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
      "If an inspection identifies defects or non-compliant work, we document the issues clearly and provide you with a defect notice specifying what needs to be rectified. Construction can continue in areas not affected by the defect, but the specific issues must be fixed before the next inspection at that stage can be passed. We aim to communicate clearly and work with builders to resolve issues quickly so the project keeps moving. Failing an inspection is not the end of the world — it is the system working as intended.",
  },
  {
    id: "pool-granny-flat",
    category: "General",
    question: "Do I need a certifier for a swimming pool or granny flat?",
    answer:
      "Yes — both swimming pools and granny flats (secondary dwellings) require certification in NSW. For a new pool, you need building approval (either a CDC or a DA/CC) and a pool barrier compliance certificate. For a granny flat, a CDC is the most common pathway, provided the site and design meet the SEPP requirements. We handle both. Contact us with your project details and we will advise you on the approval and inspection requirements.",
  },
  {
    id: "what-is-complying-dev",
    category: "CDC",
    question: "What is a Complying Development, and does my project qualify?",
    answer:
      "Complying Development is a category of development that is pre-approved under State legislation — meaning that if your project strictly meets the code requirements, it automatically qualifies for a CDC without needing a council DA. The codes cover a wide range of standard residential projects but have specific requirements around things like site area, setbacks, height, heritage, and flood constraints. The best way to find out if your project qualifies is to contact us directly — we assess eligibility quickly and give you a straight answer.",
  },
  {
    id: "how-soon",
    category: "General",
    question: "How soon can I get started?",
    answer:
      "We aim to respond to all enquiries within 24 hours and provide a quote for your project promptly. Once you engage us, we begin the assessment process straight away. The speed of the certification process after that depends on the quality and completeness of your documentation — which is why we provide a clear checklist upfront. Call us on 0423 925 514 or send an email to info@certifyright.com.au and we will get back to you the same business day.",
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
