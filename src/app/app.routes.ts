import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Projects } from './projects/projects';
import { Contact } from './contact/contact';
import { Resume } from './resume/resume';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home | Clarence Lane Parungao' },
  { path: 'about', component: About, title: 'About | Clarence Lane Parungao' },
  { path: 'projects', component: Projects, title: 'Projects | Clarence Lane Parungao' },
  { path: 'contact', component: Contact, title: 'Contact | Clarence Lane Parungao' },
  { path: 'resume', component: Resume, title: 'Resume | Clarence Lane Parungao' },
  { path: '**', redirectTo: '' }
];