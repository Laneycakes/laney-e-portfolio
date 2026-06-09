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
      status: '2026',
      description: 'Created UI/UX wireframes and contributed to website content and documentation, focusing on improving usability, visual appeal, and the overall user experience.',
      tools: ['UI/UX Design', 'Figma', 'Blog Content', 'Documentation']
    },
    {
      title: 'SplitSmart',
      image: 'Splitsmart.png',
      status: '2025',
      description: 'Collaborated with a student team in designing a web-based bill-splitting application, contributing to interface planning, user experience design, and project documentation.',
      tools: []
    }
  ];

  get colA() { return this.highlightSkills.filter((_, i) => i % 2 === 0); }
  get colB() { return this.highlightSkills.filter((_, i) => i % 2 !== 0); }
  
  ngAfterViewInit(): void {}

  @HostListener('window:resize')
  onResize(): void {}
}