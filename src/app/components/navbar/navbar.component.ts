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
  scrolled        = false;
  mobileOpen      = false;
  scrollProgress  = 0;
  activeSection   = '';          // ← tracks which section is in view

  navLinks = [
    { label: 'Services', href: 'services' },
    { label: 'Why Us',   href: 'why'      },
    { label: 'About',    href: 'about'    },
    { label: 'Contact',  href: 'contact'  },
  ];

  private sectionObserver!: IntersectionObserver;

  ngOnInit(): void {
    this.updateProgress();
    this.initSectionObserver();
  }

  ngOnDestroy(): void {
    if (this.sectionObserver) this.sectionObserver.disconnect();
  }

  // ── Scroll progress + scrolled flag ──────────────────────────────
  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 20;
    this.updateProgress();
  }

  private updateProgress(): void {
    const doc        = document.documentElement;
    const scrollTop  = window.scrollY;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    this.scrollProgress = scrollHeight > 0
      ? (scrollTop / scrollHeight) * 100
      : 0;
  }

  // ── Active-section detection via IntersectionObserver ────────────
  // Observes every section whose id matches a navLink href.
  // Whichever section covers the most of the viewport top area is "active".
  private initSectionObserver(): void {
    const sectionIds = this.navLinks.map(l => l.href);

    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
          }
        });
      },
      {
        // rootMargin: top offset accounts for the fixed navbar height
        rootMargin: '-64px 0px -40% 0px',
        threshold: 0,
      }
    );

    // Wait one tick for sections to be rendered
    setTimeout(() => {
      sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) this.sectionObserver.observe(el);
      });
    }, 300);
  }

  // ── Click handlers ───────────────────────────────────────────────
  toggleMobile(): void { this.mobileOpen = !this.mobileOpen; }
  closeMobile():  void { this.mobileOpen = false; }

  scrollTo(id: string): void {
    this.activeSection = id;           // set immediately on click for instant feedback
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    this.closeMobile();
  }
}
