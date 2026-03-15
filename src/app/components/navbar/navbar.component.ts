import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  scrolled = false;
  mobileOpen = false;
  scrollProgress = 0;

  navLinks = [
    { label: 'Services', href: 'services' },
    { label: 'Why Us',   href: 'why' },
    { label: 'About',    href: 'about' },
    { label: 'Contact',  href: 'contact' },
  ];

  ngOnInit(): void { this.updateProgress(); }
  ngOnDestroy(): void {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 20;
    this.updateProgress();
  }

  private updateProgress(): void {
    const doc = document.documentElement;
    const scrollTop = window.scrollY;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    this.scrollProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  }

  toggleMobile(): void { this.mobileOpen = !this.mobileOpen; }
  closeMobile(): void  { this.mobileOpen = false; }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    this.closeMobile();
  }
}
