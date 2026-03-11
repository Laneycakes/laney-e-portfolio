import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Project {
  title: string; description: string; tools: string[];
  category: string; image: string; status: string;
  siteUrl?: string;
}

interface Cert {
  name: string; issuer: string; year: string; image: string; url: string; _key?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class Projects implements OnInit {

  filters = ['All', 'UI/UX', 'Frontend', 'SEO'];
  activeFilter = 'All';

  allProjects: Project[] = [
    {
      title: 'MJ Quality Cars',
      description: 'A local car dealership website designed to promote second-hand vehicles and connect buyers with affordable, quality options in Mabalacat, Pampanga.',
      tools: ['UI/UX Design', 'SEO', 'Figma', 'Documentation'],
      category: 'SEO', image: 'MJQualityCars.png', status: 'In Progress',
      siteUrl: 'https://www.mjqualitycars.com/'
    },
    {
      title: 'Split Smart',
      description: 'Designed UI/UX wireframes and overall user flow. Created project logo and visual identity. Developed project documentation and feature descriptions.',
      tools: ['Figma', 'UI/UX Design', 'Documentation', 'Wireframing'],
      category: 'UI/UX', image: 'Splitsmart.png', status: '2025',
      siteUrl: ''
    },
    {
      title: 'StudioSpot',
      description: 'Designed UI/UX wireframes for booking and management features. Prepared structured project documentation for a studio booking and management platform.',
      tools: ['Figma', 'UI/UX Design', 'Wireframing', 'Documentation'],
      category: 'UI/UX', image: 'StudioSpot.jpg', status: '2025',
      siteUrl: ''
    },
    {
      title: 'Pookieater – Cookie Website',
      description: 'Designed and developed a fully static product website. Showcased product catalog, business information, and contact details for a cookie business.',
      tools: ['HTML', 'CSS', 'JavaScript'],
      category: 'Frontend', image: 'PookieEater.png', status: '2024',
      siteUrl: ''
    },
    {
      title: 'Portfolio Website',
      description: 'This very portfolio! Built with Angular, CSS, and best web development practices including SEO, accessibility, and responsive design.',
      tools: ['Angular', 'TypeScript', 'CSS', 'Responsive Design'],
      category: 'Frontend', image: 'profile.png', status: 'In Progress',
      siteUrl: ''
    }
  ];

  filteredProjects: Project[] = [];
  displayProjects: Project[] = [];
  isInfinite = true;

  activeIndex = 0;
  offset = 0;
  carouselReady = false;
  private readonly CARD_W = 380;
  private readonly GAP = 24;

  ngOnInit(): void {
    this.filteredProjects = this.allProjects;
    this.buildDisplayProjects();
    this.buildCertList();
    setTimeout(() => {
      this.computeOffset();
      this.carouselReady = true;
    }, 50);
  }

  buildDisplayProjects(): void {
    if (this.isInfinite) {
      this.displayProjects = [
        ...this.filteredProjects,
        ...this.filteredProjects,
        ...this.filteredProjects
      ];
      this.activeIndex = this.filteredProjects.length;
    } else {
      this.displayProjects = [...this.filteredProjects];
      this.activeIndex = 0;
    }
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
    this.isInfinite = filter === 'All';
    this.filteredProjects = filter === 'All'
      ? this.allProjects
      : this.allProjects.filter(p => p.category === filter);
    this.buildDisplayProjects();
    this.carouselReady = false;
    setTimeout(() => {
      this.computeOffset();
      this.carouselReady = true;
    }, 50);
  }

  get dotIndex(): number {
    if (this.isInfinite) return this.activeIndex % this.filteredProjects.length;
    return this.activeIndex;
  }

  goTo(i: number): void {
    this.activeIndex = this.isInfinite ? this.filteredProjects.length + i : i;
    this.computeOffset();
  }

  prevSlide(): void {
    if (!this.isInfinite && this.activeIndex === 0) return;
    this.activeIndex--;
    this.computeOffset();
    if (this.isInfinite) this.checkReset();
  }

  nextSlide(): void {
    if (!this.isInfinite && this.activeIndex >= this.filteredProjects.length - 1) return;
    this.activeIndex++;
    this.computeOffset();
    if (this.isInfinite) this.checkReset();
  }

  checkReset(): void {
    const len = this.filteredProjects.length;
    setTimeout(() => {
      if (this.activeIndex <= 0) {
        this.carouselReady = false;
        this.activeIndex = len;
        this.computeOffset();
        setTimeout(() => { this.carouselReady = true; }, 20);
      } else if (this.activeIndex >= len * 2) {
        this.carouselReady = false;
        this.activeIndex = len;
        this.computeOffset();
        setTimeout(() => { this.carouselReady = true; }, 20);
      }
    }, 520);
  }

  computeOffset(): void {
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1400;
    const center = (vw / 2) - (this.CARD_W / 2);
    this.offset = center - this.activeIndex * (this.CARD_W + this.GAP);
  }

  // Keyboard arrow keys + two-finger trackpad swipe
  @HostListener('window:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); this.prevSlide(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); this.nextSlide(); }
  }

  private touchStartX = 0;
  private touchStartY = 0;

  @HostListener('touchstart', ['$event'])
  onTouchStart(e: TouchEvent): void {
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(e: TouchEvent): void {
    const dx = e.changedTouches[0].clientX - this.touchStartX;
    const dy = e.changedTouches[0].clientY - this.touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      dx < 0 ? this.nextSlide() : this.prevSlide();
    }
  }

  @HostListener('window:wheel', ['$event'])
  onWheel(e: WheelEvent): void {
    // Only trigger on horizontal scroll (two-finger trackpad swipe)
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 30) {
      e.preventDefault();
      e.deltaX > 0 ? this.nextSlide() : this.prevSlide();
    }
  }

  @HostListener('window:resize') onResize(): void { this.computeOffset(); }

  openSite(url: string | undefined): void {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  }

  certifications: Cert[] = [
    { name: 'Content Marketing',               issuer: 'HubSpot',    year: '2025', image: 'Content Marketing.png',                                      url: 'https://app-na2.hubspot.com/academy/achievements/zdl96ljd/en/1/clarence-lane-parungao/content-marketing' },
    { name: 'Website UI/UX w/ ChatGPT',        issuer: 'Simplilearn', year: '2025', image: 'Website UIUX Designing using ChatGPT.png',                  url: 'https://simpli-web.app.link/e/WAVm0Z3pp1b' },
    { name: 'Introduction to Figma',           issuer: 'Simplilearn', year: '2024', image: 'intro to figma.png',                                         url: 'https://simpli-web.app.link/e/fQyy9Iypp1b' },
    { name: 'Introduction to PHP',             issuer: 'Simplilearn', year: '2025', image: 'Intro to PHP.png',                                           url: 'https://simplilearn.com' },
    { name: 'Design Thinking for Beginners',   issuer: 'Simplilearn', year: '2025', image: 'Design thinking for beginners.png',                          url: 'https://simpli-web.app.link/e/OQhzdD4vp1b' },
    { name: 'Graphic Design & UI/UX Basics',   issuer: 'Simplilearn', year: '2025', image: 'Introduction to Graphic Design; Basics of UIUX.png',         url: 'https://simpli-web.app.link/e/xYJrSj2pp1b' },
    { name: 'SEO Certified',                   issuer: 'HubSpot',    year: '2025', image: 'SEO Certified.png',                                          url: 'https://app-na2.hubspot.com/academy/achievements/rt8k501v/en/1/clarence-lane-parungao/seo' },
    { name: 'SEO II Certified',                issuer: 'HubSpot',    year: '2026', image: 'SEO II Certified.png',                                        url: 'https://app-na2.hubspot.com/academy/achievements/c6h0qpry/en/1/clarence-lane-parungao/seo-ii' },
    { name: 'Digital Advertising',             issuer: 'HubSpot',    year: '2025', image: 'Digital Advertising.png',                                    url: 'https://app-na2.hubspot.com/academy/achievements/kwrdztc7/en/1/clarence-lane-parungao/digital-advertising' },
    { name: 'Digital Marketing',               issuer: 'HubSpot',    year: '2025', image: 'Digital Marketing.png',                                      url: 'https://app-na2.hubspot.com/academy/achievements/b3j8m0hd/en/1/clarence-lane-parungao/digital-marketing' },
    { name: 'JS Algorithms & Data Structures', issuer: 'fCC',        year: '2025', image: 'Legacy Javascript Algorithm data structure.png',              url: 'https://www.freecodecamp.org/certification/laney_cakes/javascript-algorithms-and-data-structures' },
    { name: 'Back End Dev & APIs',             issuer: 'fCC',        year: '2025', image: 'BackEndDev and API.png',                                      url: 'https://www.freecodecamp.org/certification/laney_cakes/back-end-development-and-apis' },
    { name: 'Legacy Responsive Web Design',    issuer: 'fCC',        year: '2024', image: 'Legacy Responsive Web Design V8.png',                         url: 'https://www.freecodecamp.org/certification/laney_cakes/responsive-web-design' },
    { name: 'JavaScript Essentials',           issuer: 'Cisco',      year: '2024', image: 'javascript-essentials-1.png',                                url: 'https://www.credly.com/badges/5f51bcbb-cec5-404b-a136-5b4f009922de' },
  ];

  certDisplayList: Cert[] = [];

  buildCertList(): void {
    const doubled = [...this.certifications, ...this.certifications];
    this.certDisplayList = doubled.map((c, i) => ({ ...c, _key: `${c.name}_${i}` }));
  }

  openCertLink(cert: Cert): void {
    window.open(cert.url, '_blank', 'noopener,noreferrer');
  }
}