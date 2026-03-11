import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Cert {
  name: string; issuer: string; year: string; url: string;
}

@Component({
  selector: 'app-resume',
  imports: [CommonModule],
  templateUrl: './resume.html',
  styleUrl: './resume.css'
})
export class Resume {

  technicalSkills = [
    { icon: 'devicon-html5-plain colored', name: 'HTML 5' },
    { icon: 'devicon-css3-plain colored', name: 'CSS 3' },
    { icon: 'devicon-javascript-plain colored', name: 'JavaScript' },
    { icon: 'devicon-angular-plain colored', name: 'Angular' },
    { icon: 'devicon-vuejs-plain colored', name: 'Vue.js' },
    { icon: 'devicon-flutter-plain colored', name: 'Flutter' },
    { icon: 'devicon-dart-plain colored', name: 'Dart' },
    { icon: 'devicon-tailwindcss-plain colored', name: 'Tailwind CSS' },
    { icon: 'devicon-bootstrap-plain colored', name: 'Bootstrap' },
    { icon: 'devicon-figma-plain colored', name: 'Figma' },
    { icon: 'devicon-github-original colored', name: 'GitHub' },
    { icon: 'devicon-git-plain colored', name: 'Git' },
  ];

  softSkills = [
    { emoji: '💬', name: 'Communication' },
    { emoji: '🧩', name: 'Problem Solving' },
    { emoji: '🤝', name: 'Team Collaboration' },
    { emoji: '🔄', name: 'Adaptability' },
    { emoji: '⏰', name: 'Time Management' },
    { emoji: '🔍', name: 'Attention to Detail' },
  ];

  resumeProjects = [
    {
      title: 'MJ Quality Cars', status: 'In Progress',
      points: [
        'Designed UI/UX wireframes for a local car dealership website',
        'Implemented SEO strategies to increase online visibility and organic traffic',
        'Focused on website speed, user experience, and structured content for Google ranking',
        'Prepared project documentation and feature descriptions'
      ]
    },
    {
      title: 'Split Smart', status: '2025',
      points: [
        'Designed UI/UX wireframes and overall user flow',
        'Created project logo and visual identity',
        'Developed project documentation and feature descriptions',
        'Coordinated with team members to align system functionality and interface design'
      ]
    },
    {
      title: 'StudioSpot', status: '2025',
      points: [
        'Designed UI/UX wireframes for booking and management features',
        'Prepared structured project documentation'
      ]
    },
    {
      title: 'Pookieater – Cookie Website', status: '2024',
      points: [
        'Designed and developed a static product website',
        'Showcased product catalog, business information, and contact details'
      ]
    }
  ];

  resumeExperience = [
    { org: 'CodeGeeks (CG)', role: 'Officer of Communication Records', period: '2025 – 2026' },
    { org: 'CodeGeeks (CG)', role: 'Member', period: '2024 – 2025' },
    { org: 'Cybersecurity Intelligence Alliance (CSIA)', role: 'Member', period: '2024 – 2025' },
    { org: 'Commission on Student Organization (CSO)', role: 'Commissioner – School of Computing', period: '2024 – 2025' },
    { org: 'School of Computing Student Council (SOC-CSC)', role: 'Community Extension Staff', period: '2024 – 2025' },
    { org: 'School of Computing Student Council (SOC-CSC)', role: 'Finance Staff', period: '2023 – 2025' },
  ];

  allCerts: Cert[] = [
    { name: 'Content Marketing',               issuer: 'HubSpot',    year: '2025', url: 'https://app-na2.hubspot.com/academy/achievements/zdl96ljd/en/1/clarence-lane-parungao/content-marketing' },
    { name: 'Website UI/UX w/ ChatGPT',        issuer: 'Simplilearn', year: '2025', url: 'https://simpli-web.app.link/e/WAVm0Z3pp1b' },
    { name: 'Introduction to Figma',           issuer: 'Simplilearn', year: '2024', url: 'https://simpli-web.app.link/e/fQyy9Iypp1b' },
    { name: 'Introduction to PHP',             issuer: 'Simplilearn', year: '2025', url: 'https://simplilearn.com' },
    { name: 'Design Thinking for Beginners',   issuer: 'Simplilearn', year: '2025', url: 'https://simpli-web.app.link/e/OQhzdD4vp1b' },
    { name: 'Graphic Design & UI/UX Basics',   issuer: 'Simplilearn', year: '2025', url: 'https://simpli-web.app.link/e/xYJrSj2pp1b' },
    { name: 'SEO Certified',                   issuer: 'HubSpot',    year: '2025', url: 'https://app-na2.hubspot.com/academy/achievements/rt8k501v/en/1/clarence-lane-parungao/seo' },
    { name: 'SEO II Certified',                issuer: 'HubSpot',    year: '2026', url: 'https://app-na2.hubspot.com/academy/achievements/c6h0qpry/en/1/clarence-lane-parungao/seo-ii' },
    { name: 'Digital Advertising',             issuer: 'HubSpot',    year: '2025', url: 'https://app-na2.hubspot.com/academy/achievements/kwrdztc7/en/1/clarence-lane-parungao/digital-advertising' },
    { name: 'Digital Marketing',               issuer: 'HubSpot',    year: '2025', url: 'https://app-na2.hubspot.com/academy/achievements/b3j8m0hd/en/1/clarence-lane-parungao/digital-marketing' },
    { name: 'JS Algorithms & Data Structures', issuer: 'fCC',        year: '2025', url: 'https://www.freecodecamp.org/certification/laney_cakes/javascript-algorithms-and-data-structures' },
    { name: 'Back End Dev & APIs',             issuer: 'fCC',        year: '2025', url: 'https://www.freecodecamp.org/certification/laney_cakes/back-end-development-and-apis' },
    { name: 'Legacy Responsive Web Design',    issuer: 'fCC',        year: '2024', url: 'https://www.freecodecamp.org/certification/laney_cakes/responsive-web-design' },
    { name: 'JavaScript Essentials',           issuer: 'Cisco',      year: '2024', url: 'https://www.credly.com/badges/5f51bcbb-cec5-404b-a136-5b4f009922de' },
  ];

  openCert(cert: Cert): void {
    window.open(cert.url, '_blank', 'noopener,noreferrer');
  }
}