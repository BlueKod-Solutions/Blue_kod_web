import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { WhyPoint } from '../../models/models';

interface Bubble {
  icon:  string;
  label: string;
  sub:   string;
  color: string;
  delay: string;
}

@Component({
  selector: 'app-why',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './why.component.html',
  styleUrls: ['./why.component.scss']
})
export class WhyComponent {

  points: WhyPoint[] = [
    {
      icon: 'bolt',
      title: 'Lightning Fast Delivery',
      description: 'We work with agile sprints and clear milestones — no delays, no excuses. Your project ships on time, every time.',
      gradient: 'linear-gradient(135deg, #1a3a7c, #2451a8)',
    },
    {
      icon: 'workspace_premium',
      title: 'Premium Quality Code',
      description: 'Clean, maintainable, and scalable codebases built on industry best practices. Your tech won\'t become technical debt.',
      gradient: 'linear-gradient(135deg, #164e63, #0891b2)',
    },
    {
      icon: 'support_agent',
      title: 'Dedicated Support',
      description: 'Post-launch, we don\'t disappear. Ongoing support, quick fixes, and continuous improvements are part of every engagement.',
      gradient: 'linear-gradient(135deg, #1e1b4b, #4338ca)',
    },
    {
      icon: 'price_check',
      title: 'Transparent Pricing',
      description: 'Fixed quotes, no hidden costs. You\'ll always know exactly what you\'re paying for before a single line of code is written.',
      gradient: 'linear-gradient(135deg, #064e3b, #059669)',
    },
  ];

  // Value-focused bubbles — what we offer, not numbers we've done
  bubbles: Bubble[] = [
    { icon: 'verified_user',  label: 'Trusted Work',    sub: 'Guaranteed quality',  color: '#3b82f6', delay: '0s'    },
    { icon: 'flash_on',       label: 'Fast Turnaround', sub: 'Ship in days',        color: '#06b6d4', delay: '0.15s' },
    { icon: 'handshake',      label: 'Full Support',    sub: 'We\'ve got you',      color: '#818cf8', delay: '0.3s'  },
    { icon: 'emoji_objects',  label: 'Fresh Ideas',     sub: 'Modern tech stack',   color: '#22c55e', delay: '0.45s' },
  ];
}
