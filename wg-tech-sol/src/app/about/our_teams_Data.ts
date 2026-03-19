export type TeamSection = 'Director & CEO' | 'Manager' | 'heads';

export type TeamMember = {
  name: string;
  designation: string;
  image?: string; // e.g. "/images/team/saudAli.jpeg"
  bio: string;
  section: TeamSection;
  socials?: {
    linkedin?: string;
    facebook?: string; // or X
    instagram?: string;
  };
};

const ourTeamsData: TeamMember[] = [
  // Director & CEO (2)
  {
    name: "Bilawal Ayoub",
    designation: "CEO & Founder",
    image: "/images/team/team1.png",
    bio: "Vision-driven founder leading WGTechSol’s growth, product strategy, and partnerships.",
    section: 'Director & CEO',
    socials: {
      linkedin: "https://www.linkedin.com/in/muhammad-bilawal-ayoub-wgtecsol?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      facebook: "https://www.facebook.com/share/19b2wd2fA5/",
      instagram: "https://www.instagram.com/h.m.bilawal90?igsh=MThpaWRwbGZ0MGowZw==",
    },
  },


  // Manager (2)
  {
    name: "Haris Khan",
    designation: "Co‑Founder & CTO",
    bio: "Leads technology strategy—modern stacks, scalability, and engineering excellence.",
    section: 'Manager',
    socials: {
      linkedin: "https://www.linkedin.com/in/haris-khan",
      facebook: "https://facebook.com/haris_cto",
      instagram: "https://instagram.com/haris.cto",
    },
  },
  {
    name: "Sara Ahmed",
    designation: "Co‑Founder & COO",
    bio: "Owns operations—process, delivery, and team growth with a quality-first mindset.",
    section: 'Manager',
    socials: {
      linkedin: "https://www.linkedin.com/in/sara-ahmed",
      facebook: "https://facebook.com/sara_ops",
      instagram: "https://instagram.com/sara.ops",
    },
  },

  // Heads of Departments (multi)
  {
    name: "Maria Khan",
    designation: "Head of Design",
    bio: "Design leader focused on accessible, scalable UI systems and memorable user experiences.",
    section: 'heads',
    socials: {
      linkedin: "https://www.linkedin.com/in/maria-khan",
      facebook: "https://facebook.com/maria_khan",
      instagram: "https://instagram.com/maria.khan",
    },
  },
  {
    name: "Hassan Ahmed",
    designation: "Head of Engineering",
    bio: "Builds robust APIs and high-performance frontends using Next.js, Node.js, and cloud services.",
    section: 'heads',
    socials: {
      linkedin: "https://www.linkedin.com/in/hassan-ahmed",
      facebook: "https://facebook.com/hassan_dev",
      instagram: "https://instagram.com/hassan.dev",
    },
  },
  {
    name: "Sana Iqbal",
    designation: "Product Manager",
    image: "/images/team/sana-iqbal.jpg",
    bio: "Turns user insights into actionable roadmaps, aligning business goals with product outcomes.",
    section: 'heads',
    socials: {
      linkedin: "https://www.linkedin.com/in/sana-iqbal",
      facebook: "https://facebook.com/sana_pm",
      instagram: "https://instagram.com/sana.pm",
    },
  },
  {
    name: "Umar Farooq",
    designation: "DevOps Lead",
    image: "/images/team/umar-farooq.jpg",
    bio: "Automates CI/CD, observability, and scalable infra on AWS—security-first and cost-aware.",
    section: 'heads',
    socials: {
      linkedin: "https://www.linkedin.com/in/umar-farooq",
      facebook: "https://facebook.com/umar_ops",
      instagram: "https://instagram.com/umar.ops",
    },
  },
];

export default ourTeamsData;