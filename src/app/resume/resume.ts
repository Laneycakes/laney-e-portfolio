import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resume',
  imports: [CommonModule],
  templateUrl: './resume.html',
  styleUrl: './resume.css'
})
export class Resume {

  allSkills = [
    'HTML', 'CSS', 'JavaScript', 'Angular', 'Vue.js', 'Flutter',
    'Tailwind CSS', 'Bootstrap', 'Figma', 'VS Code', 'GitHub', 'XAMPP', 'Canva', 'Git'
  ];

  resumeProjects = [
    {
      title: 'MJ Quality Cars',
      status: 'In Progress',
      points: [
        'Designed UI/UX wireframes for a local car dealership website',
        'Implemented SEO strategies to increase online visibility and organic traffic',
        'Focused on website speed, user experience, and structured content for Google ranking',
        'Prepared project documentation and feature descriptions'
      ]
    },
    {
      title: 'Split Smart',
      status: '2025',
      points: [
        'Designed UI/UX wireframes and overall user flow',
        'Created project logo and visual identity',
        'Developed project documentation and feature descriptions',
        'Coordinated with team members to align system functionality and interface design'
      ]
    },
    {
      title: 'StudioSpot',
      status: '2025',
      points: [
        'Designed UI/UX wireframes for booking and management features',
        'Prepared structured project documentation'
      ]
    },
    {
      title: 'Pookieater – Cookie Website',
      status: '2024',
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

  allCerts = [
    { name: 'Content Marketing',               issuer: 'HubSpot',    year: '2025' },
    { name: 'Website UI/UX w/ ChatGPT',        issuer: 'Simplilearn', year: '2025' },
    { name: 'Introduction to Figma',           issuer: 'Simplilearn', year: '2024' },
    { name: 'Introduction to PHP',             issuer: 'Simplilearn', year: '2025' },
    { name: 'Design Thinking for Beginners',   issuer: 'Simplilearn', year: '2025' },
    { name: 'Graphic Design & UI/UX Basics',   issuer: 'Simplilearn', year: '2025' },
    { name: 'SEO Certified',                   issuer: 'HubSpot',    year: '2025' },
    { name: 'SEO II Certified',                issuer: 'HubSpot',    year: '2026' },
    { name: 'Digital Advertising',             issuer: 'HubSpot',    year: '2025' },
    { name: 'Digital Marketing',               issuer: 'HubSpot',    year: '2025' },
    { name: 'JS Algorithms & Data Structures', issuer: 'fCC',        year: '2025' },
    { name: 'Back End Dev & APIs',             issuer: 'fCC',        year: '2025' },
    { name: 'Legacy Responsive Web Design',    issuer: 'fCC',        year: '2024' },
    { name: 'JavaScript Essentials',           issuer: 'Cisco',      year: '2024' },
  ];
}