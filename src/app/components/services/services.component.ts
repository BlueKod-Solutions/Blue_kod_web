import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface ServiceCard {
  icon: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  backPoints: string[];
  // price: string;
  gradient: string;
  accentColor: string;
  accentRgb: string;
  flipped: boolean;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  services: ServiceCard[] = [
    {
      icon: 'code',
      title: 'Website Development',
      tagline: 'Modern web apps that scale',
      description: 'Responsive and modern web applications using the latest technologies. From landing pages to full-stack platforms.',
      tags: ['Angular', 'React', 'Node.js', 'TypeScript'],
      backPoints: [
        'Custom responsive design for all devices',
        'Performance-optimised, SEO-ready builds',
        'REST & GraphQL API integration',
        'CI/CD deployment pipelines',
        'Post-launch maintenance & support',
      ],
      // price: 'From ₹25,000',
      gradient: 'linear-gradient(135deg, #1a3a7c, #2451a8)',
      accentColor: '#3b82f6',
      accentRgb: '59, 130, 246',
      flipped: false,
    },
    {
      icon: 'psychology',
      title: 'AI Development',
      tagline: 'Intelligent automation & LLMs',
      description: 'Custom AI solutions including ML models, automation pipelines, and intelligent chatbots.',
      tags: ['Python', 'TensorFlow', 'LLMs', 'APIs'],
      backPoints: [
        'Custom LLM fine-tuning & prompt engineering',
        'AI chatbot & virtual assistant builds',
        'Data pipeline & ML model deployment',
        'Computer vision & NLP solutions',
        'Ongoing model monitoring & retraining',
      ],
      // price: 'From ₹40,000',
      gradient: 'linear-gradient(135deg, #164e63, #0891b2)',
      accentColor: '#06b6d4',
      accentRgb: '6, 182, 212',
      flipped: false,
    },
    {
      icon: 'palette',
      title: 'Logo & Brand Design',
      tagline: 'Identities that tell your story',
      description: 'Creative and professional brand identity designs. Logos, design systems, and visual assets.',
      tags: ['Figma', 'Branding', 'Illustration', 'UI/UX'],
      backPoints: [
        'Primary & secondary logo variants',
        'Full brand guidelines document',
        'Colour palette & typography system',
        'Social media kit & print assets',
        'Unlimited revisions until perfect',
      ],
      // price: 'From ₹12,000',
      gradient: 'linear-gradient(135deg, #1e1b4b, #4338ca)',
      accentColor: '#818cf8',
      accentRgb: '129, 140, 248',
      flipped: false,
    },
    {
      icon: 'dns',
      title: 'Domain & Web Hosting',
      tagline: 'Fast, secure, always online',
      description: 'Complete domain registration and managed web hosting solutions for businesses of all sizes.',
      tags: ['cPanel', 'SSL', 'CDN', '99.9% Uptime'],
      backPoints: [
        'Custom domain registration & transfer',
        'Free SSL certificate included',
        'Global CDN for lightning-fast loads',
        '99.9% uptime SLA guarantee',
        '24/7 server monitoring & support',
      ],
      // price: 'From ₹2,999/yr',
      gradient: 'linear-gradient(135deg, #064e3b, #059669)',
      accentColor: '#22c55e',
      accentRgb: '34, 197, 94',
      flipped: false,
    },
  ];

  flip(svc: ServiceCard): void {
    svc.flipped = !svc.flipped;
  }
   scrollToContact(): void {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
}
