import { Component, AfterViewInit, HostListener } from '@angular/core';
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
    { icon: 'devicon-bootstrap-plain colored', name: 'Bootstrap' },
    { icon: 'devicon-git-plain colored', name: 'Git' },
  ];

  featuredProjects = [
    {
      title: 'MJ Quality Cars',
      image: 'MJQualityCars.png',
      status: 'In Progress',
      description: 'A local car dealership website designed to promote second-hand vehicles and connect buyers with quality options in Mabalacat, Pampanga.',
      tools: ['UI/UX Design', 'SEO', 'Figma']
    },
    {
      title: 'Split Smart',
      image: 'Splitsmart.png',
      status: '2025',
      description: 'A smart expense-splitting app with full UI/UX design, wireframes, user flow, and project documentation.',
      tools: ['Figma', 'UI/UX', 'Documentation']
    }
  ];

  get colA() { return this.highlightSkills.filter((_, i) => i % 2 === 0); }
  get colB() { return this.highlightSkills.filter((_, i) => i % 2 !== 0); }
  
  ngAfterViewInit(): void {}

  @HostListener('window:resize')
  onResize(): void {}
}