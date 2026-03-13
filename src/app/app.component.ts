import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component';
import { WhyComponent } from './components/why/why.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { ScrollRevealService } from './services/scroll-reveal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    ServicesComponent,
    WhyComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    ChatbotComponent,
  ],
  template: `
    <div class="app-shell">
      <app-navbar></app-navbar>
      <main>
        <app-hero></app-hero>
        <app-services></app-services>
        <app-why></app-why>
        <app-about></app-about>
        <app-contact></app-contact>
      </main>
      <app-footer></app-footer>
      <app-chatbot></app-chatbot>
    </div>
  `,
  styles: [`
    .app-shell {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background: var(--bk-navy-900);
    }
    main { flex: 1; }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private scrollReveal: ScrollRevealService) {}

  ngOnInit(): void {
    // Init scroll reveal after first render
    setTimeout(() => this.scrollReveal.init(), 300);
  }

  ngOnDestroy(): void {
    this.scrollReveal.destroy();
  }
}
