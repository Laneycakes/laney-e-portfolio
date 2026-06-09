/* ════════════════════════════════════════════════════════════
   resume.ts — RESUME PAGE DATA
   Updated to match Resume_Parungao,ClarenceLane.pdf exactly.

   WHAT YOU CAN CHANGE HERE:
   ─────────────────────────
   technicalSkills  → skill chips in the sidebar
                      icon: devicon class from devicon.dev
                      name: label shown on the chip

   softSkills       → soft skill rows in the sidebar
                      name: the skill name

   resumeProjects   → project entries in the main content
                      title:  project name
                      status: shown as a tag ("In Progress" = pink, else green)
                      points: bullet points under the project

   resumeExperience → experience/leadership timeline entries
                      org:    organization name
                      role:   your role/title
                      period: date range shown as a tag
                      desc:   description paragraph (NEW — matches resume)

   allCerts         → certification list (click to verify)
                      name, issuer, year, url
   ════════════════════════════════════════════════════════════ */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Cert {
  name: string;
  issuer: string;
  year: string;
  url: string;
}

interface Experience {
  org: string;
  role: string;
  period: string;
  desc: string; /* description paragraph from the resume */
}

@Component({
  selector: 'app-resume',
  imports: [CommonModule],
  templateUrl: './resume.html',
  styleUrl: './resume.css'
})
export class Resume {

  /* ════════════════════════════════════════
     TECHNICAL SKILLS (sidebar chips)
     ════════════════════════════════════════
     Matches the Skills section of the PDF:
     Frontend Development + UI/UX Design + Tools & Technologies.

     TO ADD: copy any object, pick a devicon class from devicon.dev
     TO REMOVE: delete the object
     ════════════════════════════════════════ */
  technicalSkills = [
    /* ── Frontend Development ── */
    { icon: 'devicon-html5-plain colored',        name: 'HTML'              },
    { icon: 'devicon-css3-plain colored',         name: 'CSS'               },
    { icon: 'devicon-javascript-plain colored',   name: 'JavaScript'        },
    { icon: 'devicon-angular-plain colored',      name: 'Angular'           },
    { icon: 'devicon-tailwindcss-plain colored',  name: 'Responsive Design' },
    /* ── UI/UX Design ── */
    { icon: 'devicon-figma-plain colored',        name: 'Figma'             },
    { icon: 'devicon-canva-plain colored',        name: 'Canva'             },
    /* ── Tools & Technologies ── */
    { icon: 'devicon-vscode-plain colored',       name: 'VS Code'           },
    { icon: 'devicon-git-plain colored',          name: 'Git'               },
    { icon: 'devicon-github-original colored',    name: 'GitHub'            },
    { icon: 'devicon-mysql-plain colored',        name: 'XAMPP'             },
    { icon: 'devicon-google-plain colored',       name: 'Google Docs'       },
  ];

  /* ════════════════════════════════════════
     SOFT SKILLS (sidebar list)
     ════════════════════════════════════════
     Taken directly from the Soft Skills section of the PDF.
     TO EDIT: change the name string.
     ════════════════════════════════════════ */
  softSkills = [
    { name: 'Communication'        },
    { name: 'Teamwork'             },
    { name: 'Leadership'           },
    { name: 'Adaptability'         },
    { name: 'Documentation'        },
    { name: 'Project Management'   },
    { name: 'Willingness to Learn' },
  ];

  /* ════════════════════════════════════════
     PROJECTS (main content)
     ════════════════════════════════════════
     status:
     - "In Progress" → renders as a pink badge
     - Any year string (e.g. "2025") → renders as a green badge
     ════════════════════════════════════════ */
  resumeProjects = [
    {
      title: "Laney's E-Portfolio — Personal Portfolio Website",
      status: '2026',
      points: [
        'Designed and developed a responsive portfolio website to showcase my projects, skills, and achievements, with a focus on user-friendly navigation and modern web design.',
      ]
    },
    {
      title: 'MJ Quality Cars — Car Dealership Website',
      status: '2026',
      points: [
        'Created UI/UX wireframes and contributed to website content and documentation, focusing on improving usability, visual appeal, and the overall user experience.',
      ]
    },
    {
      title: 'SplitSmart — Web App Bill-Splitting System',
      status: '2025',
      points: [
        'Collaborated with a student team in designing a web-based bill-splitting application, contributing to interface planning, user experience design, and project documentation.',
      ]
    },
    {
      title: 'StudioSpot — Studio Rental Management System',
      status: '2025',
      points: [
        'Contributed to the UI/UX design and documentation of a studio rental management system, focusing on intuitive user flows and a seamless booking experience.',
      ]
    },
    {
      title: 'PookieEater — Cookie Website Prototype',
      status: '2024',
      points: [
        'Designed and developed a responsive website prototype for a homemade cookie business, showcasing products and customer reviews with a focus on accessibility and user engagement.',
      ]
    },
  ];

  /* ════════════════════════════════════════
     EXPERIENCE & LEADERSHIP (main content)
     ════════════════════════════════════════
     TO ADD AN ENTRY: copy any object and fill in all 4 fields.
     TO REMOVE: delete the object.
     TO REORDER: move objects up or down in the array.
     ════════════════════════════════════════ */
  resumeExperience: Experience[] = [
    {
      org: 'Code Geeks, Holy Angel University',
      role: 'Officer of Communication and Records',
      period: 'June 2025 – March 2026',
      desc: 'Managed organizational communications, maintained official records and documentation, and coordinated with members, advisers, and university offices to support organizational activities and student engagement.'
    },
    {
      org: 'School of Computing, Holy Angel University',
      role: 'Community Extension Staff',
      period: 'June 2024 – March 2025',
      desc: 'Assisted in organizing community outreach programs and university events while promoting technology literacy and collaboration among students, faculty, and local communities.'
    },
    {
      org: 'Commission on Student Organizations (CSO), Holy Angel University',
      role: 'Commissioner, School of Computing',
      period: 'June 2024 – March 2025',
      desc: 'Oversaw student organizations within the School of Computing, facilitated accreditation processes, and promoted collaboration, leadership, and student participation.'
    },
    {
      org: 'School of Computing, Holy Angel University',
      role: 'Finance Staff',
      period: 'June 2023 – April 2024',
      desc: 'Assisted in managing financial records, budget monitoring, and event-related expenses while supporting administrative and organizational operations.'
    },
  ];

  /* ════════════════════════════════════════
     CERTIFICATIONS (main content — clickable)
     ════════════════════════════════════════
     Clicking any item opens the verification URL in a new tab.

     TO ADD: copy any object and fill in all 4 fields.
     url: the credential verification link.
     ════════════════════════════════════════ */
  allCerts: Cert[] = [
    { name: 'Content Marketing',               issuer: 'HubSpot',     year: '2025', url: 'https://app-na2.hubspot.com/academy/achievements/zdl96ljd/en/1/clarence-lane-parungao/content-marketing'  },
    { name: 'Website UI/UX w/ ChatGPT',        issuer: 'Simplilearn', year: '2025', url: 'https://simpli-web.app.link/e/WAVm0Z3pp1b'                                                                 },
    { name: 'Introduction to Figma',           issuer: 'Simplilearn', year: '2024', url: 'https://www.simplilearn.com/free-figma-course-with-certificate-course-skillup'                             },
    { name: 'Introduction to PHP',             issuer: 'Simplilearn', year: '2025', url: 'https://www.simplilearn.com/learn-php-basics-free-course-skillup'                                          },
    { name: 'Graphic Design & UI/UX Basics',   issuer: 'Simplilearn', year: '2025', url: 'https://simpli-web.app.link/e/xYJrSj2pp1b'                                                                 },
    { name: 'Design Thinking for Beginners',   issuer: 'Simplilearn', year: '2025', url: 'https://simpli-web.app.link/e/OQhzdD4vp1b'                                                                 },
    { name: 'SEO Certified',                   issuer: 'HubSpot',     year: '2025', url: 'https://app-na2.hubspot.com/academy/achievements/rt8k501v/en/1/clarence-lane-parungao/seo'                  },
    { name: 'SEO II Certified',                issuer: 'HubSpot',     year: '2026', url: 'https://app-na2.hubspot.com/academy/achievements/c6h0qpry/en/1/clarence-lane-parungao/seo-ii'              },
    { name: 'Digital Advertising',             issuer: 'HubSpot',     year: '2025', url: 'https://app-na2.hubspot.com/academy/achievements/kwrdztc7/en/1/clarence-lane-parungao/digital-advertising'  },
    { name: 'Digital Marketing',               issuer: 'HubSpot',     year: '2025', url: 'https://app-na2.hubspot.com/academy/achievements/b3j8m0hd/en/1/clarence-lane-parungao/digital-marketing'    },
    { name: 'JS Algorithms & Data Structures', issuer: 'fCC',         year: '2025', url: 'https://www.freecodecamp.org/certification/laney_cakes/javascript-algorithms-and-data-structures'           },
    { name: 'Back End Dev & APIs',             issuer: 'fCC',         year: '2025', url: 'https://www.freecodecamp.org/certification/laney_cakes/back-end-development-and-apis'                       },
    { name: 'Legacy Responsive Web Design',    issuer: 'fCC',         year: '2024', url: 'https://www.freecodecamp.org/certification/laney_cakes/responsive-web-design'                               },
    { name: 'JavaScript Essentials',           issuer: 'Cisco',       year: '2024', url: 'https://www.credly.com/badges/5f51bcbb-cec5-404b-a136-5b4f009922de'                                        },
  ];

  /* Opens a certificate verification URL in a new tab */
  openCert(cert: Cert): void {
    window.open(cert.url, '_blank', 'noopener,noreferrer');
  }
}