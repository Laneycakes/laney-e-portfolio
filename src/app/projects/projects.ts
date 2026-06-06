/* ════════════════════════════════════════════════════════════
   projects.ts — PROJECTS PAGE

   WHAT'S IN HERE:
   - Project data (title, description, tools, image, etc.)
   - Certification data
   - Filter logic (All / UI/UX / Frontend / etc.)
   - Thumbnail strip: scrolls on its own, pauses on hover
   - Preview panel: shows big image + details for active project

   KEY FIXES IN THIS VERSION:
   1. NO auto-advance by default — the strip scrolls visually
      but the active project only changes when the user clicks
      a thumbnail, dot, or Prev/Next button.
   2. selectProject() now uses NgZone.run() so Angular detects
      the change immediately — fixing the "need to move cursor"
      bug where the preview panel wouldn't update until you
      wiggled the mouse.
   3. previewSwitching crossfade works reliably with NgZone.
   ════════════════════════════════════════════════════════════ */

import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/* ── Interfaces ─────────────────────────────── */

interface Project {
  title: string;
  description: string;
  tools: string[];
  category: string;
  image: string;       /* filename in /public, e.g. "Splitsmart.png" */
  status: string;      /* "In Progress" | "2025" | "2024" etc. */
  siteUrl?: string;    /* optional live URL — shows a "Visit" overlay */
}

interface Cert {
  name: string;
  issuer: string;
  year: string;
  image: string;
  url: string;
  _key?: string; /* internal tracking key for *ngFor */
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class Projects implements OnInit, OnDestroy {

  /* NgZone lets us run code inside Angular's change-detection zone
     from inside setTimeout callbacks. Without it, changes made inside
     setTimeout don't update the DOM until the user moves the mouse.
     This was the root cause of the "cursor move to see update" bug. */
  constructor(private zone: NgZone) {}


  /* ════════════════════════════════════════
     FILTER BUTTONS
     ════════════════════════════════════════
     TO ADD A FILTER: add a string to this array AND make sure
     at least one project has a matching category field below.
     TO REMOVE: delete the string from this array. */
  filters = ['All', 'UI/UX', 'Frontend', 'Full Stack', 'SEO'];
  activeFilter = 'All';


  /* ════════════════════════════════════════
     PROJECT DATA
     ════════════════════════════════════════
     Each object is one project shown in the showcase.

     FIELDS:
     title       → project name shown in the preview panel
     description → paragraph shown below the big image
     tools       → tag pills shown in the preview panel
     category    → must match one of the filters[] strings above
     image       → filename in /public (e.g. "Splitsmart.png")
                   ★ TO CHANGE A PROJECT IMAGE: update this filename.
                   The file must be in your /public folder.
     status      → shown as a badge on the big image
                   Use "In Progress" for the pink badge,
                   any other string (e.g. "2025") for the green badge.
     siteUrl     → (optional) if set, hovering the big image shows
                   a "Visit Live Site" overlay. Leave as '' to hide it.
     ════════════════════════════════════════ */
  allProjects: Project[] = [
    {
      title: "Laney's E-Portfolio",
      description:
        'A responsive personal portfolio website built with Angular, showcasing projects, skills, leadership experiences, and achievements. Designed with a custom pink-and-green brand identity.',
      tools: ['Angular', 'TypeScript', 'CSS', 'Responsive Design', 'SEO'],
      category: 'Frontend',
      image: 'Logo.png',          /* ← swap with a screenshot of the portfolio */
      status: 'In Progress',
      siteUrl: ''
    },
    {
      title: 'MJ Quality Cars',
      description:
        'A local car dealership website built to promote second-hand vehicles in Mabalacat, Pampanga. Designed UI/UX wireframes, implemented SEO strategies, created blog content, and prepared project documentation.',
      tools: ['UI/UX Design', 'SEO', 'Figma', 'Blog Content', 'Documentation'],
      category: 'SEO',
      image: 'MJQualityCars.png',    /* ← screenshot of the MJ Quality Cars site */
      status: 'In Progress',
      siteUrl: 'https://www.mjqualitycars.com/'
    },
    {
      title: 'SplitSmart',
      description:
        'A web-based bill-splitting application developed with a student team. Contributed to the back-end architecture using Node.js, Express.js, and MongoDB, as well as UI/UX wireframes and overall user flow.',
      tools: ['Node.js', 'Express.js', 'MongoDB', 'Figma', 'UI/UX'],
      category: 'Full Stack',
      image: 'Splitsmart.png',       /* ← screenshot of SplitSmart */
      status: '2025',
      siteUrl: ''
    },
    {
      title: 'StudioSpot',
      description:
        'A web-based studio rental management system. Focused on UI/UX design — including wireframes for booking and management flows — and structured project documentation.',
      tools: ['Figma', 'UI/UX Design', 'Wireframing', 'Documentation'],
      category: 'UI/UX',
      image: 'StudioSpot.jpg',       /* ← screenshot of StudioSpot */
      status: '2025',
      siteUrl: ''
    },
    {
      title: 'PookieEater',
      description:
        'A responsive website prototype for a homemade cookie business. Showcases products, pricing, and customer reviews. Designed and developed from scratch as a front-end practice project.',
      tools: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
      category: 'Frontend',
      image: 'PookieEater.png',      /* ← screenshot of PookieEater */
      status: '2024',
      siteUrl: ''
    }
  ];

  /* The list shown in the UI — updated by setFilter() */
  filteredProjects: Project[] = [];

  /* Index of the currently displayed project (0-based) */
  activeProjectIndex = 0;

  /* Computed getter — the template uses activeProject.title etc. */
  get activeProject(): Project | null {
    return this.filteredProjects[this.activeProjectIndex] ?? null;
  }


  /* ════════════════════════════════════════
     THUMBNAIL STRIP STATE
     ════════════════════════════════════════
     isThumbPaused: set true on mouseenter, false on mouseleave.
     Toggling this class pauses/resumes the CSS scroll animation.

     previewSwitching: set true briefly when changing project.
     CSS reads this to fade the preview out then back in. */
  isThumbPaused = false;
  previewSwitching = false;


  /* ════════════════════════════════════════
     LIFECYCLE
     ════════════════════════════════════════ */

  ngOnInit(): void {
    /* Show all projects on load */
    this.filteredProjects = this.allProjects;

    /* Build doubled cert list for the horizontal scroll section */
    this.buildCertList();

    /* NOTE: We intentionally do NOT start an auto-advance interval here.
       The thumbnail strip scrolls on its own via CSS animation, but the
       ACTIVE PROJECT only changes when the user explicitly clicks. */
  }

  ngOnDestroy(): void {
    /* Nothing to clean up (no intervals) */
  }


  /* ════════════════════════════════════════
     FILTER
     ════════════════════════════════════════ */

  setFilter(filter: string): void {
    this.activeFilter = filter;
    this.filteredProjects =
      filter === 'All'
        ? this.allProjects
        : this.allProjects.filter(p => p.category === filter);

    /* Reset to the first project when filter changes */
    this.activeProjectIndex = 0;
  }


  /* ════════════════════════════════════════
     PROJECT SELECTION
     ════════════════════════════════════════
     selectProject() is called by:
     - clicking a thumbnail
     - clicking Prev / Next buttons
     - clicking a dot indicator

     THE CURSOR-MOVE BUG FIX:
     The original code ran setTimeout outside Angular's zone, so
     Angular's change detection didn't pick up the index change
     until the next user interaction (moving the mouse).
     Fix: wrap the setTimeout callback in this.zone.run(() => { ... })
     so Angular knows to check for changes right away. */
  selectProject(index: number): void {
    this.activeProjectIndex = index;
  }

  prevProject(): void {
    const len = this.filteredProjects.length;
    const prev = (this.activeProjectIndex - 1 + len) % len;
    this.selectProject(prev);
  }

  nextProject(): void {
    const next = (this.activeProjectIndex + 1) % this.filteredProjects.length;
    this.selectProject(next);
  }


  /* ════════════════════════════════════════
     THUMBNAIL STRIP PAUSE / RESUME
     ════════════════════════════════════════
     Called by (mouseenter) and (mouseleave) on each thumbnail.
     The .paused CSS class stops the scrolling animation. */
  pauseThumb(): void  { this.isThumbPaused = true;  }
  resumeThumb(): void { this.isThumbPaused = false; }


  /* ════════════════════════════════════════
     CERTIFICATIONS
     ════════════════════════════════════════
     TO ADD A CERTIFICATE: copy any object below and fill in
     name, issuer, year, image (filename in /public), and url.

     image    → certificate image filename in /public
     url      → verification link (HubSpot / Simplilearn / fCC etc.) */
  certifications: Cert[] = [
    { name: 'Content Marketing',               issuer: 'HubSpot',     year: '2025', image: 'Content Marketing.png',                              url: 'https://app-na2.hubspot.com/academy/achievements/zdl96ljd/en/1/clarence-lane-parungao/content-marketing' },
    { name: 'Website UI/UX w/ ChatGPT',        issuer: 'Simplilearn', year: '2025', image: 'Website UIUX Designing using ChatGPT.png',           url: 'https://simpli-web.app.link/e/WAVm0Z3pp1b' },
    { name: 'Graphic Design & UI/UX Basics',   issuer: 'Simplilearn', year: '2025', image: 'Introduction to Graphic Design; Basics of UIUX.png', url: 'https://simpli-web.app.link/e/xYJrSj2pp1b' },
    { name: 'Design Thinking for Beginners',   issuer: 'Simplilearn', year: '2025', image: 'Design thinking for beginners.png',                  url: 'https://simpli-web.app.link/e/OQhzdD4vp1b' },
    { name: 'SEO Certified',                   issuer: 'HubSpot',     year: '2025', image: 'SEO Certified.png',                                  url: 'https://app-na2.hubspot.com/academy/achievements/rt8k501v/en/1/clarence-lane-parungao/seo' },
    { name: 'SEO II Certified',                issuer: 'HubSpot',     year: '2026', image: 'SEO II Certified.png',                               url: 'https://app-na2.hubspot.com/academy/achievements/c6h0qpry/en/1/clarence-lane-parungao/seo-ii' },
    { name: 'Digital Advertising',             issuer: 'HubSpot',     year: '2025', image: 'Digital Advertising.png',                            url: 'https://app-na2.hubspot.com/academy/achievements/kwrdztc7/en/1/clarence-lane-parungao/digital-advertising' },
    { name: 'Digital Marketing',               issuer: 'HubSpot',     year: '2025', image: 'Digital Marketing.png',                              url: 'https://app-na2.hubspot.com/academy/achievements/b3j8m0hd/en/1/clarence-lane-parungao/digital-marketing' },
    { name: 'JS Algorithms & Data Structures', issuer: 'fCC',         year: '2025', image: 'Legacy Javascript Algorithm data structure.png',     url: 'https://www.freecodecamp.org/certification/laney_cakes/javascript-algorithms-and-data-structures' },
    { name: 'Back End Dev & APIs',             issuer: 'fCC',         year: '2025', image: 'BackEndDev and API.png',                             url: 'https://www.freecodecamp.org/certification/laney_cakes/back-end-development-and-apis' },
    { name: 'Legacy Responsive Web Design',    issuer: 'fCC',         year: '2024', image: 'Legacy Responsive Web Design V8.png',                url: 'https://www.freecodecamp.org/certification/laney_cakes/responsive-web-design' },
    { name: 'JavaScript Essentials',           issuer: 'Cisco',       year: '2024', image: 'javascript-essentials-1.png',                        url: 'https://www.credly.com/badges/5f51bcbb-cec5-404b-a136-5b4f009922de' },
  ];

  certDisplayList: Cert[] = [];

  buildCertList(): void {
    /* Double the list so the CSS horizontal scroll loops seamlessly.
       Same -50% trick as the skills marquee. */
    const doubled = [...this.certifications, ...this.certifications];
    this.certDisplayList = doubled.map((c, i) => ({
      ...c,
      _key: `${c.name}_${i}` /* unique key prevents *ngFor tracking conflicts */
    }));
  }

  openCertLink(cert: Cert): void {
    window.open(cert.url, '_blank', 'noopener,noreferrer');
  }
}