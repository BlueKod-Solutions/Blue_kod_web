import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { WhyPoint, Metric } from '../../models/models';

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

  metrics: Metric[] = [
    { icon: 'trending_up', value: '150+', label: 'Successful Projects',    fillPercent: 92, gradient: 'linear-gradient(135deg,#1a3a7c,#3b82f6)' },
    { icon: 'groups',      value: '80+',  label: 'Happy Clients Worldwide', fillPercent: 80, gradient: 'linear-gradient(135deg,#164e63,#0891b2)' },
    { icon: 'schedule',    value: '4 Yrs',label: 'Industry Experience',     fillPercent: 70, gradient: 'linear-gradient(135deg,#064e3b,#059669)' },
    { icon: 'star',        value: '4.9★', label: 'Average Client Rating',   fillPercent: 98, gradient: 'linear-gradient(135deg,#1e1b4b,#4338ca)' },
  ];
}
