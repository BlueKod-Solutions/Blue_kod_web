import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  scrolled = false;
  mobileOpen = false;

  navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Why Us',   href: '#why' },
    { label: 'About',    href: '#about' },
    { label: 'Contact',  href: '#contact' },
  ];

  ngOnInit(): void {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 20;
  }

  toggleMobile(): void { this.mobileOpen = !this.mobileOpen; }
  closeMobile(): void  { this.mobileOpen = false; }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    this.closeMobile();
  }
}
