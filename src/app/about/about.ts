import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class About {

  allSkills = [
    // Technical
    { icon: 'devicon-html5-plain colored', name: 'HTML 5', category: 'technical' },
    { icon: 'devicon-css3-plain colored', name: 'CSS 3', category: 'technical' },
    { icon: 'devicon-javascript-plain colored', name: 'JavaScript', category: 'technical' },
    { icon: 'devicon-angular-plain colored', name: 'Angular', category: 'technical' },
    { icon: 'devicon-vuejs-plain colored', name: 'Vue.js', category: 'technical' },
    { icon: 'devicon-flutter-plain colored', name: 'Flutter', category: 'technical' },
    { icon: 'devicon-bootstrap-plain colored', name: 'Bootstrap', category: 'technical' },
    { icon: 'devicon-tailwindcss-plain colored', name: 'Tailwind CSS', category: 'technical' },
    // Tools
    { icon: 'devicon-figma-plain colored', name: 'Figma', category: 'tools' },
    { icon: 'devicon-vscode-plain colored', name: 'VS Code', category: 'tools' },
    { icon: 'devicon-github-original colored', name: 'GitHub', category: 'tools' },
    { icon: 'devicon-canva-plain colored', name: 'Canva', category: 'tools' },
    { icon: 'devicon-mysql-plain colored', name: 'XAMPP', category: 'tools' },
    { icon: 'devicon-git-plain colored', name: 'Git', category: 'tools' },
  ];

  softSkills = [
    { icon: '💬', name: 'Communication' },
    { icon: '🤝', name: 'Teamwork' },
    { icon: '🔄', name: 'Adaptability' },
    { icon: '📝', name: 'Documentation' },
    { icon: '📚', name: 'Willingness to Learn' },
  ];

  experiences = [
    { org: 'CodeGeeks (CG)', role: 'Officer of Communication Records', period: '2025 – 2026' },
    { org: 'CodeGeeks (CG)', role: 'Member', period: '2024 – 2025' },
    { org: 'Cybersecurity Intelligence Alliance (CSIA)', role: 'Member', period: '2024 – 2025' },
    { org: 'Commission on Student Organization (CSO)', role: 'Commissioner – School of Computing', period: '2024 – 2025' },
    { org: 'School of Computing Student Council (SOC-CSC)', role: 'Community Extension Staff', period: '2024 – 2025' },
    { org: 'School of Computing Student Council (SOC-CSC)', role: 'Finance Staff', period: '2023 – 2025' },
  ];
}