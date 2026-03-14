import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  company = [
    { label: 'About Us',    href: '#about' },
    { label: 'Why BlueKod', href: '#why' },
    { label: 'Services',    href: '#services' },
    { label: 'Contact',     href: '#contact' },
  ];

  services = [
    { label: 'Web Development',  href: '#services' },
    { label: 'AI Solutions',     href: '#services' },
    { label: 'Brand Design',     href: '#services' },
    { label: 'Domain & Hosting', href: '#services' },
  ];

  contact = [
    { icon: 'mail_outline', value: 'admin@bluekod.com' },
    { icon: 'telegram',         value: '@bluekod' },
    { icon: 'schedule',     value: 'Mon–Fri, 9am–6pm IST' },
    { icon: 'location_on',  value: 'Remote · Worldwide' },
  ];
}
