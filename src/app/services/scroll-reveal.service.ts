import { Injectable, NgZone } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollRevealService {
  private observer!: IntersectionObserver;

  constructor(private ngZone: NgZone) {}

  init(): void {
    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('shown');
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );

      // Observe all .reveal elements after a tick
      setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => this.observer.observe(el));
      }, 100);
    });
  }

  destroy(): void {
    if (this.observer) this.observer.disconnect();
  }

  observe(el: Element): void {
    if (this.observer) this.observer.observe(el);
  }
}
