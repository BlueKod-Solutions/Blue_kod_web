import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, OnDestroy {
  roles = ['Web Applications', 'AI Solutions', 'Brand Identities', 'Digital Products', 'Mobile Apps'];
  currentRole = this.roles[0];
  roleVisible = true;
  private roleIndex = 0;
  private intervalId!: ReturnType<typeof setInterval>;

  stats = [
    { value: '150+', label: 'Projects' },
    { value: '98%',  label: 'Satisfaction' },
    { value: '5★',   label: 'Rated' },
  ];

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.roleVisible = false;
      setTimeout(() => {
        this.roleIndex = (this.roleIndex + 1) % this.roles.length;
        this.currentRole = this.roles[this.roleIndex];
        this.roleVisible = true;
      }, 400);
    }, 2800);
  }

  ngOnDestroy(): void { clearInterval(this.intervalId); }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
