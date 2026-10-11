export const phonePrimary = "9559628719";
export const phoneSecondary = "8881470477";
export const whatsappNumber = "919559628719";
export const email = "govindsharmabr45@gmail.com";
export const office = "Lanka, Near BHU Gate, Varanasi";
export const googleFormUrl = "https://forms.gle/Hfm24hrm4uZ9M64V9";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export type Service = {
  title: string;
  description: string;
  metric: string;
};

export const academicServices: Service[] = [
  {
    title: "MBA Projects & Reports",
    description: "Final year MBA projects, synopsis, PPT and viva support.",
    metric: "150+ projects completed",
  },
  {
    title: "B.Tech / B.E Projects",
    description: "Engineering projects with documentation and explanation.",
    metric: "200+ projects delivered",
  },
  {
    title: "Diploma / Polytechnic",
    description: "Technical diploma projects with practical guidance.",
    metric: "120+ students helped",
  },
  {
    title: "M.Sc / B.Sc Projects",
    description: "Science-based academic projects and reports.",
    metric: "90+ projects done",
  },
  {
    title: "BCA / MCA Projects",
    description: "Computer projects with coding, reports and presentation help.",
    metric: "180+ projects completed",
  },
  {
    title: "Assignments",
    description: "Plagiarism-free assignments for all subjects.",
    metric: "500+ assignments submitted",
  },
  {
    title: "PPT & Presentations",
    description: "Professional PowerPoint slides for project presentation.",
    metric: "300+ PPTs designed",
  },
  {
    title: "Synopsis & Proposal",
    description: "University-format synopsis and project proposals.",
    metric: "250+ approved",
  },
  {
    title: "Research Papers",
    description: "Journal, review and research paper assistance.",
    metric: "100+ papers published",
  },
  {
    title: "Thesis & Dissertation",
    description: "Complete dissertation writing and final submission support.",
    metric: "80+ completed",
  },
  {
    title: "Plagiarism-Free Content",
    description: "Original content with checking and report support.",
    metric: "Turnitin checked",
  },
  {
    title: "Viva & Project Guidance",
    description: "Complete guidance from topic selection to final viva.",
    metric: "Full support",
  },
];

export const printingServices = [
  {
    title: "Printing Services",
    description: ["Black & white / color printing", "Project printing", "Spiral binding", "Report formatting"],
    cta: "Order on WhatsApp",
    href: `https://wa.me/${whatsappNumber}?text=Hello,%20I%20want%20Printing%20Service%20details`,
  },
  {
    title: "Thesis Printing",
    description: ["Hard binding thesis", "Gold printing", "University format setting", "Same day service"],
    cta: "Get Thesis Printed",
    href: `https://wa.me/${whatsappNumber}?text=Hello,%20I%20need%20Thesis%20Printing%20Service`,
  },
];
