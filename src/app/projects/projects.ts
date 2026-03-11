import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string; description: string; tools: string[];
  category: string; image: string; status: string;
  liveUrl?: string; codeUrl?: string;
}

interface Cert {
  name: string; issuer: string; year: string; image: string; _key?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class Projects implements OnInit {

  filters = ['All', 'UI/UX', 'Frontend', 'SEO'];
  activeFilter = 'All';

  allProjects: Project[] = [
    { title: 'MJ Quality Cars', description: 'A local car dealership website designed to promote second-hand vehicles and connect buyers with affordable, quality options in Mabalacat, Pampanga. Focused on SEO strategies, website speed, and user experience.', tools: ['UI/UX Design', 'SEO', 'Figma', 'Documentation'], category: 'SEO', image: 'MJQualityCars.png', status: 'In Progress' },
    { title: 'Split Smart', description: 'Designed UI/UX wireframes and overall user flow. Created project logo and visual identity. Developed project documentation and feature descriptions.', tools: ['Figma', 'UI/UX Design', 'Documentation', 'Wireframing'], category: 'UI/UX', image: 'Splitsmart.png', status: '2025' },
    { title: 'StudioSpot', description: 'Designed UI/UX wireframes for booking and management features. Prepared structured project documentation for a studio booking and management platform.', tools: ['Figma', 'UI/UX Design', 'Wireframing', 'Documentation'], category: 'UI/UX', image: 'StudioSpot.jpg', status: '2025' },
    { title: 'Pookieater – Cookie Website', description: 'Designed and developed a fully static product website. Showcased product catalog, business information, and contact details for a cookie business.', tools: ['HTML', 'CSS', 'JavaScript'], category: 'Frontend', image: 'PookieEater.png', status: '2024' },
    { title: 'Portfolio Website', description: 'This very portfolio! Built with Angular, CSS, and best web development practices including SEO, accessibility, and responsive design.', tools: ['Angular', 'TypeScript', 'CSS', 'Responsive Design'], category: 'Frontend', image: 'profile.png', status: 'In Progress' }
  ];

  filteredProjects: Project[] = [];
  displayProjects: Project[] = []; // tripled array for infinite loop illusion

  // We keep a "virtual" index that always points to the middle copy
  activeIndex = 0;
  offset = 0;
  carouselReady = false;
  private isDragging = false;
  private dragStartX = 0;
  private readonly CARD_W = 360;
  private readonly GAP = 24;
  private isAnimating = false;

  ngOnInit(): void {
    this.filteredProjects = this.allProjects;
    this.buildDisplayProjects();
    this.buildCertList();
    setTimeout(() => {
      this.snapToCenter();
      this.carouselReady = true;
    }, 0);
  }

  buildDisplayProjects(): void {
    // Triple the array so we can always scroll left or right
    this.displayProjects = [
      ...this.filteredProjects,
      ...this.filteredProjects,
      ...this.filteredProjects
    ];
    // Start at middle copy
    this.activeIndex = this.filteredProjects.length;
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
    this.filteredProjects = filter === 'All'
      ? this.allProjects
      : this.allProjects.filter(p => p.category === filter);
    this.buildDisplayProjects();
    setTimeout(() => {
      this.snapToCenter();
      this.carouselReady = true;
    }, 0);
  }

  snapToCenter(): void {
    this.carouselReady = false;
    this.computeOffset();
    setTimeout(() => { this.carouselReady = true; }, 50);
  }

  goTo(i: number): void {
    // i is the dot index (0-based within filteredProjects)
    this.activeIndex = this.filteredProjects.length + i;
    this.computeOffset();
  }

  get dotIndex(): number {
    return this.activeIndex % this.filteredProjects.length;
  }

  prevSlide(): void {
    this.activeIndex--;
    this.computeOffset();
    this.checkReset();
  }

  nextSlide(): void {
    this.activeIndex++;
    this.computeOffset();
    this.checkReset();
  }

  // Silently jump back to middle copy when reaching edges
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
    }, 520); // after transition finishes
  }

  computeOffset(): void {
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const center = (vw / 2) - (this.CARD_W / 2);
    this.offset = center - this.activeIndex * (this.CARD_W + this.GAP);
  }

  dragStart(e: MouseEvent): void { this.isDragging = true; this.dragStartX = e.clientX; }
  cancelDrag(): void { this.isDragging = false; }

  dragEnd(e: MouseEvent): void {
    if (!this.isDragging) return;
    const diff = e.clientX - this.dragStartX;
    if (Math.abs(diff) > 60) diff < 0 ? this.nextSlide() : this.prevSlide();
    this.isDragging = false;
  }

  @HostListener('window:resize') onResize(): void { this.computeOffset(); }
  @HostListener('document:keydown.escape') onEsc(): void { this.closeCert(); }

  certifications: Cert[] = [
    { name: 'Content Marketing',               issuer: 'HubSpot',    year: '2025', image: 'Content Marketing.png' },
    { name: 'Website UI/UX w/ ChatGPT',        issuer: 'Simplilearn', year: '2025', image: 'Website UIUX Designing using ChatGPT.png' },
    { name: 'Introduction to Figma',           issuer: 'Simplilearn', year: '2024', image: 'intro to figma.png' },
    { name: 'Introduction to PHP',             issuer: 'Simplilearn', year: '2025', image: 'Intro to PHP.png' },
    { name: 'Design Thinking for Beginners',   issuer: 'Simplilearn', year: '2025', image: 'Design thinking for beginners.png' },
    { name: 'Graphic Design & UI/UX Basics',   issuer: 'Simplilearn', year: '2025', image: 'Introduction to Graphic Design; Basics of UIUX.png' },
    { name: 'SEO Certified',                   issuer: 'HubSpot',    year: '2025', image: 'SEO Certified.png' },
    { name: 'SEO II Certified',                issuer: 'HubSpot',    year: '2026', image: 'SEO II Certified.png' },
    { name: 'Digital Advertising',             issuer: 'HubSpot',    year: '2025', image: 'Digital Advertising.png' },
    { name: 'Digital Marketing',               issuer: 'HubSpot',    year: '2025', image: 'Digital Marketing.png' },
    { name: 'JS Algorithms & Data Structures', issuer: 'fCC',        year: '2025', image: 'Legacy Javascript Algorithm data structure.png' },
    { name: 'Back End Dev & APIs',             issuer: 'fCC',        year: '2025', image: 'BackEndDev and API.png' },
    { name: 'Legacy Responsive Web Design',    issuer: 'fCC',        year: '2024', image: 'Legacy Responsive Web Design V8.png' },
    { name: 'JavaScript Essentials',           issuer: 'Cisco',      year: '2024', image: 'javascript-essentials-1.png' },
  ];

  certDisplayList: Cert[] = [];

  buildCertList(): void {
    const doubled = [...this.certifications, ...this.certifications];
    this.certDisplayList = doubled.map((c, i) => ({ ...c, _key: `${c.name}_${i}` }));
  }

  lightboxCert: Cert | null = null;
  openCert(cert: Cert): void { this.lightboxCert = cert; }
  closeCert(): void { this.lightboxCert = null; }
}