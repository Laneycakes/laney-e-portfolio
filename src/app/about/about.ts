/* ════════════════════════════════════════════════════════════
   about.ts — ABOUT PAGE DATA

   This file holds all the data shown on the About page.
   The HTML (about.html) reads from the arrays below.

   WHAT YOU CAN CHANGE HERE:
   - funFacts       → the 4 stat cards (value + label)
   - skillTabs      → the filter tab buttons (All / Frontend / etc.)
   - allSkills      → every skill card (icon, name, level 0–100)
   - softSkills     → the soft skill badges (icon SVG + name + desc)
   - experiences    → the timeline cards
   ════════════════════════════════════════════════════════════ */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class About implements OnInit, OnDestroy {

  /* ════════════════════════════════════════
     PHOTO CROSSFADE
     ════════════════════════════════════════
     The profile photo slowly fades between two images.
     TO CHANGE WHICH PHOTOS CYCLE:
     Edit the filenames in the photos array below.
     Files must be in your /public folder.
     TO ADD MORE: e.g. ['profile.png', 'profile2.png', 'profile3.png']
     TO STOP CYCLING: remove the setInterval in ngOnInit. */
  photos = ['profile.png', 'profile2.png'];
  currentPhotoIndex = 0;
  currentPhoto = this.photos[0];
  photoFading = false;
  private photoInterval: any;


  /* ════════════════════════════════════════
     FUN FACTS / QUICK STATS
     ════════════════════════════════════════
     4 cards shown in a pink banner below the bio.
     Each card has: icon (SVG path string), value, label.

     TO UPDATE A NUMBER: just change the value string.
     TO CHANGE AN ICON: paste a different SVG path string.
     Free SVG icons: heroicons.com (use the path's d="..." value)
     ════════════════════════════════════════ */
  funFacts = [
    {
      /* Rocket icon */
      svg: 'M12 2C8 2 4 6 4 10c0 5 8 12 8 12s8-7 8-12c0-4-4-8-8-8zm0 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4z',
      value: '5+',
      label: 'Projects Built'
    },
    {
      /* Badge / award icon */
      svg: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
      value: '12+',
      label: 'Certifications'
    },
    {
      /* Graduation cap icon */
      svg: 'M22 10v6M2 10l10-5 10 5-10 5-10-5z M6 12v5c3 3 9 3 12 0v-5',
      value: '2027',
      label: 'Expected Graduation'
    },
    {
      /* People / group icon */
      svg: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
      value: '4+',
      label: 'Leadership Roles'
    },
  ];


  /* ════════════════════════════════════════
     SKILL CATEGORY TABS
     ════════════════════════════════════════
     The tab buttons above the skill grid.
     id must match the category field on each skill in allSkills.
     icon is a small SVG path shown inside the button.
     ════════════════════════════════════════ */
  skillTabs = [
    {
      id: 'all',
      /* Grid / sparkle icon */
      svg: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
      label: 'All'
    },
    {
      id: 'frontend',
      /* Monitor icon */
      svg: 'M20 3H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h7l-2 3h6l-2-3h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z',
      label: 'Frontend'
    },
    {
      id: 'design',
      /* Pen / feather icon */
      svg: 'M12 20h9 M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z',
      label: 'Design'
    },
    {
      id: 'tools',
      /* Wrench icon */
      svg: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
      label: 'Tools'
    },
  ];

  /* Currently selected tab id — bound to [class.active] in the HTML */
  activeSkillCategory = 'all';

  /* Called by (click) on each tab button */
  setSkillCategory(id: string): void {
    this.activeSkillCategory = id;
  }


  /* ════════════════════════════════════════
     ALL SKILLS
     ════════════════════════════════════════
     Each skill shows as a card in the grid.

     FIELDS:
     icon       → devicon CSS class (find more at devicon.dev)
     name       → displayed label on the card
     category   → 'frontend' | 'design' | 'tools'
                  must match one of the skillTabs ids above
     level      → 0–100, sets the progress bar width
     levelLabel → text shown under the icon ('Advanced' etc.)

     TO ADD A SKILL: copy any object and change all 5 fields.
     TO REMOVE: delete the whole { ... } object.
     ════════════════════════════════════════ */
  allSkills = [
    /* ── Frontend ── */
    { icon: 'devicon-html5-plain colored',       name: 'HTML 5',       category: 'frontend', level: 92, levelLabel: 'Advanced'   },
    { icon: 'devicon-css3-plain colored',        name: 'CSS 3',        category: 'frontend', level: 88, levelLabel: 'Advanced'   },
    { icon: 'devicon-javascript-plain colored',  name: 'JavaScript',   category: 'frontend', level: 78, levelLabel: 'Proficient' },
    { icon: 'devicon-angular-plain colored',     name: 'Angular',      category: 'frontend', level: 74, levelLabel: 'Proficient' },
    { icon: 'devicon-vuejs-plain colored',       name: 'Vue.js',       category: 'frontend', level: 60, levelLabel: 'Familiar'   },
    { icon: 'devicon-tailwindcss-plain colored', name: 'Tailwind CSS', category: 'frontend', level: 80, levelLabel: 'Proficient' },
    { icon: 'devicon-bootstrap-plain colored',   name: 'Bootstrap',    category: 'frontend', level: 76, levelLabel: 'Proficient' },
    { icon: 'devicon-flutter-plain colored',     name: 'Flutter',      category: 'frontend', level: 55, levelLabel: 'Familiar'   },
    { icon: 'devicon-dart-plain colored',        name: 'Dart',         category: 'frontend', level: 50, levelLabel: 'Familiar'   },
    /* ── Design ── */
    { icon: 'devicon-figma-plain colored',       name: 'Figma',        category: 'design',   level: 85, levelLabel: 'Advanced'   },
    { icon: 'devicon-canva-plain colored',       name: 'Canva',        category: 'design',   level: 90, levelLabel: 'Advanced'   },
    /* ── Tools ── */
    { icon: 'devicon-vscode-plain colored',      name: 'VS Code',      category: 'tools',    level: 90, levelLabel: 'Advanced'   },
    { icon: 'devicon-github-original colored',   name: 'GitHub',       category: 'tools',    level: 82, levelLabel: 'Proficient' },
    { icon: 'devicon-git-plain colored',         name: 'Git',          category: 'tools',    level: 78, levelLabel: 'Proficient' },
    { icon: 'devicon-mysql-plain colored',       name: 'XAMPP',        category: 'tools',    level: 65, levelLabel: 'Familiar'   },
    { icon: 'devicon-nodejs-plain colored',      name: 'Node.js',      category: 'tools',    level: 60, levelLabel: 'Familiar'   },
  ];

  /* Returns the correct subset when a tab is active.
     Used in the HTML as *ngFor="let skill of visibleSkills" */
  get visibleSkills() {
    if (this.activeSkillCategory === 'all') return this.allSkills;
    return this.allSkills.filter(s => s.category === this.activeSkillCategory);
  }


  /* ════════════════════════════════════════
     SOFT SKILLS
     ════════════════════════════════════════
     Shown as badge rows below the skill grid.
     svg  → SVG path for the icon square
     name → skill name (bold)
     desc → short description (grey text below)

     TO CHANGE AN ICON: paste a new SVG path from heroicons.com
     ════════════════════════════════════════ */
  softSkills = [
    {
      svg: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
      name: 'Communication',
      desc: 'Clear in writing and speaking'
    },
    {
      svg: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
      name: 'Teamwork',
      desc: 'Collaborative and supportive'
    },
    {
      svg: 'M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z M13 13l6 6',
      name: 'Leadership',
      desc: 'Guided teams & organizations'
    },
    {
      svg: 'M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0 1 14.85-3.36L23 10 M1 14l4.64 4.36A9 9 0 0 0 20.49 15',
      name: 'Adaptability',
      desc: 'Quick to learn new things'
    },
    {
      svg: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
      name: 'Documentation',
      desc: 'Thorough and well-organized'
    },
    {
      svg: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z',
      name: 'Project Management',
      desc: 'Keeps things on track'
    },
    {
      svg: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
      name: 'Willingness to Learn',
      desc: 'Always growing and improving'
    },
  ];


  /* ════════════════════════════════════════
     EXPERIENCE TIMELINE
     ════════════════════════════════════════
     Each entry is one card on the vertical timeline.

     TO ADD AN ENTRY: copy any object and fill in the fields.
     TO REMOVE:       delete the object.
     TO REORDER:      move objects up/down in the array — the HTML
                      renders them in the order they appear here.
     ════════════════════════════════════════ */
  experiences = [
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
     LIFECYCLE HOOKS
     ════════════════════════════════════════ */

  ngOnInit(): void {
    /* Start the photo crossfade cycle. Swaps image every 5 seconds.
       To change the interval: replace 5000 with milliseconds. */
    this.photoInterval = setInterval(() => {
      this.photoFading = true;
      setTimeout(() => {
        this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.photos.length;
        this.currentPhoto = this.photos[this.currentPhotoIndex];
        this.photoFading = false;
      }, 400); /* 400ms = fade-out duration (matches CSS transition) */
    }, 5000);
  }

  ngOnDestroy(): void {
    /* Always clear the interval when leaving the page.
       Without this the timer keeps running in memory. */
    clearInterval(this.photoInterval);
  }
}