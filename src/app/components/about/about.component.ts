import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TeamMember } from '../../models/models';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  team: TeamMember[] = [
    { emoji: '👨‍💻', name: 'Sanath S Shetty.',  role: 'Lead Developer', bg: 'rgba(59,130,246,.12)' },
    { emoji: '👩‍🎨', name: 'Aarav Shetty.',  role: 'UI/UX Designer',  bg: 'rgba(6,182,212,.12)' },
    { emoji: '🤖',   name: 'KP Shashank.',    role: 'AI Engineer',      bg: 'rgba(129,140,248,.12)' },
    { emoji: '📊',   name: 'Manoj Naik.', role: 'Project Lead',     bg: 'rgba(34,197,94,.12)' },
  ];

  values = [
    'User-first design philosophy in everything we build',
    'Constant communication and full project transparency',
    'Cutting-edge tech stack — always learning, always improving',
    'Long-term partnerships, not just one-off deliverables',
  ];

  scrollToContact(): void {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }
}
