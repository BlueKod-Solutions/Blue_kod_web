import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Service } from '../../models/models';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  services: Service[] = [
    {
      icon: 'code',
      title: 'Website Development',
      description: 'Responsive and modern web applications using the latest technologies. From landing pages to full-stack platforms — performant, scalable, and beautiful.',
      tags: ['Angular', 'React', 'Node.js', 'TypeScript'],
      gradient: 'linear-gradient(135deg, #1a3a7c, #2451a8)',
      accentColor: '#3b82f6',
      accentRgb: '59, 130, 246',
    },
    {
      icon: 'psychology',
      title: 'AI Development',
      description: 'Custom AI solutions including machine learning models, automation pipelines, and intelligent chatbots that transform how your business operates.',
      tags: ['Python', 'TensorFlow', 'LLMs', 'APIs'],
      gradient: 'linear-gradient(135deg, #164e63, #0891b2)',
      accentColor: '#06b6d4',
      accentRgb: '6, 182, 212',
    },
    {
      icon: 'palette',
      title: 'Logo & Brand Design',
      description: 'Creative and professional brand identity designs that tell your story. Logos, design systems, and visual assets crafted for lasting impact.',
      tags: ['Figma', 'Branding', 'Illustration', 'UI/UX'],
      gradient: 'linear-gradient(135deg, #1e1b4b, #4338ca)',
      accentColor: '#818cf8',
      accentRgb: '129, 140, 248',
    },
  ];

  scrollToContact(): void {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }
}
