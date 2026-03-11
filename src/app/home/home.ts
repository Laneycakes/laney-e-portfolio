import { Component, AfterViewInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements AfterViewInit {

  @ViewChild('carouselTrack') carouselTrackRef!: ElementRef;

  activeSlide = 0;
  carouselOffset = 0;
  carouselReady = false;
  private isDragging = false;
  private dragStartX = 0;
  private readonly SLIDE_WIDTH = 280;
  private readonly GAP = 20;

  highlightSkills = [
    { icon: 'devicon-html5-plain colored', name: 'HTML 5' },
    { icon: 'devicon-css3-plain colored', name: 'CSS 3' },
    { icon: 'devicon-javascript-plain colored', name: 'JavaScript' },
    { icon: 'devicon-angular-plain colored', name: 'Angular' },
    { icon: 'devicon-vuejs-plain colored', name: 'Vue.js' },
    { icon: 'devicon-flutter-plain colored', name: 'Flutter' },
    { icon: 'devicon-dart-plain colored', name: 'Dart' },
    { icon: 'devicon-figma-plain colored', name: 'Figma' },
    { icon: 'devicon-github-original colored', name: 'GitHub' },
    { icon: 'devicon-tailwindcss-plain colored', name: 'Tailwind CSS' },
  ];

  get colA() { return this.highlightSkills.filter((_, i) => i % 2 === 0); }
  get colB() { return this.highlightSkills.filter((_, i) => i % 2 !== 0); }

  featuredProjects = [
    { title: 'MJ Quality Cars', description: 'A local car dealership website designed to promote second-hand vehicles and connect buyers with quality options in Mabalacat, Pampanga.', tools: ['UI/UX Design', 'SEO', 'Figma'], image: 'MJQualityCars.png', status: 'In Progress' },
    { title: 'Split Smart', description: 'A smart expense-splitting app with full UI/UX design, wireframes, user flow, and project documentation.', tools: ['Figma', 'UI/UX', 'Documentation'], image: 'Splitsmart.png', status: '2025' },
    { title: 'StudioSpot', description: 'Booking and management platform with complete wireframes for all booking and management features.', tools: ['Figma', 'UI/UX', 'Wireframing'], image: 'StudioSpot.jpg', status: '2025' },
    { title: 'Pookieater', description: 'A fun static product website for a cookie business featuring product catalog and contact details.', tools: ['HTML', 'CSS', 'JavaScript'], image: 'PookieEater.png', status: '2024' },
  ];

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateOffset();
      this.carouselReady = true;
    }, 50);
  }

  setSlide(i: number): void { this.activeSlide = i; this.updateOffset(); }

  prevProject(): void {
    this.activeSlide = this.activeSlide > 0 ? this.activeSlide - 1 : this.featuredProjects.length - 1;
    this.updateOffset();
  }

  nextProject(): void {
    this.activeSlide = this.activeSlide < this.featuredProjects.length - 1 ? this.activeSlide + 1 : 0;
    this.updateOffset();
  }

  updateOffset(): void {
    if (this.carouselTrackRef) {
      const trackWidth = this.carouselTrackRef.nativeElement.offsetWidth;
      const center = (trackWidth / 2) - (this.SLIDE_WIDTH / 2);
      this.carouselOffset = center - (this.activeSlide * (this.SLIDE_WIDTH + this.GAP));
    }
  }

  dragStart(e: MouseEvent): void { this.isDragging = true; this.dragStartX = e.clientX; }
  cancelDrag(): void { this.isDragging = false; }

  dragEnd(e: MouseEvent): void {
    if (!this.isDragging) return;
    const diff = e.clientX - this.dragStartX;
    if (Math.abs(diff) > 60) diff < 0 ? this.nextProject() : this.prevProject();
    this.isDragging = false;
  }

  @HostListener('window:resize')
  onResize(): void { this.updateOffset(); }
}