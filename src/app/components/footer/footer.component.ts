import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  year = new Date().getFullYear();

  socials = [
    { icon: 'code',         label: 'GitHub',    href: 'https://github.com' },
    { icon: 'work',         label: 'LinkedIn',  href: 'https://linkedin.com' },
    { icon: 'mail',         label: 'Email',     href: 'Admin@bluekod.com' },
    { icon: 'public',       label: 'Twitter',   href: 'https://twitter.com' },
  ];

  company = [
    { label: 'About Us',     href: '#about' },
    { label: 'Why BlueKod',  href: '#why' },
    { label: 'Services',     href: '#services' },
    { label: 'Contact',      href: '#contact' },
  ];

  services = [
    { label: 'Web Development', href: '#services' },
    { label: 'AI Solutions',    href: '#services' },
    { label: 'Brand Design',    href: '#services' },
    { label: 'Custom Projects', href: '#services' },
  ];

  contact = [
    { icon: 'mail_outline', value: 'Admin@bluekod.com' },
    { icon: 'schedule',     value: 'Mon–Fri, 9am–6pm IST' },
    { icon: 'location_on',  value: 'Remote · Worldwide' },
    { icon: 'phone',        value: '+91 98765 43210' },
  ];
}
