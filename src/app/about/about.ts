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

  photos = ['profile.png', 'profile2.png'];
  currentPhotoIndex = 0;
  currentPhoto = this.photos[0];
  photoFading = false;
  private photoInterval: any;

  allSkills = [
    { icon: 'devicon-html5-plain colored', name: 'HTML 5', category: 'technical' },
    { icon: 'devicon-css3-plain colored', name: 'CSS 3', category: 'technical' },
    { icon: 'devicon-javascript-plain colored', name: 'JavaScript', category: 'technical' },
    { icon: 'devicon-angular-plain colored', name: 'Angular', category: 'technical' },
    { icon: 'devicon-vuejs-plain colored', name: 'Vue.js', category: 'technical' },
    { icon: 'devicon-flutter-plain colored', name: 'Flutter', category: 'technical' },
    { icon: 'devicon-bootstrap-plain colored', name: 'Bootstrap', category: 'technical' },
    { icon: 'devicon-tailwindcss-plain colored', name: 'Tailwind CSS', category: 'technical' },
    { icon: 'devicon-figma-plain colored', name: 'Figma', category: 'tools' },
    { icon: 'devicon-vscode-plain colored', name: 'VS Code', category: 'tools' },
    { icon: 'devicon-github-original colored', name: 'GitHub', category: 'tools' },
    { icon: 'devicon-canva-plain colored', name: 'Canva', category: 'tools' },
    { icon: 'devicon-mysql-plain colored', name: 'XAMPP', category: 'tools' },
    { icon: 'devicon-git-plain colored', name: 'Git', category: 'tools' },
  ];

  softSkills = [
    { name: 'Communication' },
    { name: 'Teamwork' },
    { name: 'Adaptability' },
    { name: 'Documentation' },
    { name: 'Willingness to Learn' },
  ];

  experiences = [
    { org: 'CodeGeeks (CG)', role: 'Officer of Communication Records', period: '2025 – 2026' },
    { org: 'CodeGeeks (CG)', role: 'Member', period: '2024 – 2025' },
    { org: 'Cybersecurity Intelligence Alliance (CSIA)', role: 'Member', period: '2024 – 2025' },
    { org: 'Commission on Student Organization (CSO)', role: 'Commissioner – School of Computing', period: '2024 – 2025' },
    { org: 'School of Computing Student Council (SOC-CSC)', role: 'Community Extension Staff', period: '2024 – 2025' },
    { org: 'School of Computing Student Council (SOC-CSC)', role: 'Finance Staff', period: '2023 – 2025' },
  ];

  ngOnInit(): void {
    this.photoInterval = setInterval(() => {
      this.photoFading = true;
      setTimeout(() => {
        this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.photos.length;
        this.currentPhoto = this.photos[this.currentPhotoIndex];
        this.photoFading = false;
      }, 400);
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.photoInterval);
  }
}