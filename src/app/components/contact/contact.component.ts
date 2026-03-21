// src/app/components/contact/contact.component.ts
import { Component, OnInit, OnDestroy, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContactItem } from '../../models/models';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule, FormsModule, HttpClientModule,
    MatButtonModule, MatIconModule,
    MatInputModule, MatFormFieldModule, MatSelectModule, MatSnackBarModule,
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit, OnDestroy {

  contactItems: ContactItem[] = [
    { icon: 'mail_outline', label: 'Email',            value: 'admin@bluekod.com' },
    { icon: 'telegram',          label: 'Telegram',          value: '@Info_BlueKod' },
    { icon: 'schedule',     label: 'Working Hours',    value: 'Mon – Sat, 9am – 6pm IST' },
    { icon: 'location_on',  label: 'Location',         value: 'Remote — Available Worldwide' },
    { icon: 'phone',        label: 'Phone / WhatsApp', value: '+91 7026032850 <br> +91 9972654250' },
  ];

  services = [
    'Website Development',
    'AI Development',
    'Logo & Brand Design',
    'Full Package',
    'Something Custom',
  ];

  // Country codes for the phone field selector
  countryCodes = [
    { flagUrl: 'https://flagcdn.com/w40/in.png', code: '+91',  label: 'IN' },
    { flagUrl: 'https://flagcdn.com/w40/us.png', code: '+1',   label: 'US' },
    { flagUrl: 'https://flagcdn.com/w40/gb.png', code: '+44',  label: 'GB' },
    { flagUrl: 'https://flagcdn.com/w40/ae.png', code: '+971', label: 'AE' },
    { flagUrl: 'https://flagcdn.com/w40/sg.png', code: '+65',  label: 'SG' },
    { flagUrl: 'https://flagcdn.com/w40/au.png', code: '+61',  label: 'AU' },
    { flagUrl: 'https://flagcdn.com/w40/ca.png', code: '+1',   label: 'CA' },
    { flagUrl: 'https://flagcdn.com/w40/de.png', code: '+49',  label: 'DE' },
  ];

  form = {
    firstName:   '',
    lastName:    '',
    email:       '',
    countryCode: '+91',   // default India
    countryLabel: 'IN',   // default India label
    phone:       '',
    service:     '',
    message:     '',
  };

  // ── Custom country-code dropdown state ──
  codeDropOpen    = false;
  phoneFocused    = false;
  selectedCountry = this.countryCodes[0]; // default: India

  toggleCodeDrop(): void {
    this.codeDropOpen = !this.codeDropOpen;
  }

  selectCountry(c: { flagUrl: string; code: string; label: string }): void {
    this.selectedCountry   = c;
    this.form.countryCode  = c.code;
    this.form.countryLabel = c.label;
    this.codeDropOpen      = false;
  }

  // Close on outside click
  @HostListener('document:click', ['$event'])
  onDocClick(e: Event): void {
    const wrap = this.host.nativeElement.querySelector('.code-select-wrap');
    if (this.codeDropOpen && wrap && !wrap.contains(e.target as Node)) {
      this.codeDropOpen = false;
    }
  }
  // ── end dropdown ──

  submitted      = false;
  loading        = false;
  serverError    = '';

  // Controls scroll-triggered animations
  cardVisible    = false;
  titleVisible   = false;

  private observer!: IntersectionObserver;

  constructor(
    private snackBar:       MatSnackBar,
    private contactService: ContactService,
    private host:           ElementRef,
  ) {}

  ngOnInit(): void {
    // Fire card + title animations when the section scrolls into view
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.cardVisible  = true;
          // Stagger title slightly after card starts entering
          setTimeout(() => { this.titleVisible = true; }, 250);
          this.observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    setTimeout(() => this.observer.observe(this.host.nativeElement), 100);
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.disconnect();
  }

  onSubmit(): void {
    if (!this.form.firstName.trim() || !this.form.email.trim() || !this.form.message.trim()) {
      this.snackBar.open('Please fill in all required fields.', 'OK', {
        duration: 3500, panelClass: ['snack-error'], verticalPosition: 'top',
      });
      return;
    }
    this.loading     = true;
    this.serverError = '';

    // Build payload — phone sent as combined string e.g. "+91 98765 43210"
    const payload = {
      firstName: this.form.firstName,
      lastName:  this.form.lastName,
      email:     this.form.email,
      service:   this.form.service,
      message:   this.form.message,
      phone:     this.form.phone
                   ? `${this.form.countryCode} ${this.form.phone}`
                   : '',
    };

    this.contactService.submitContact(payload).subscribe({
      next: (res) => {
        this.loading   = false;
        this.submitted = true;
        console.log('✅ Contact saved to MongoDB | id:', res.data?.id);
      },
      error: (err: Error) => {
        this.loading     = false;
        this.serverError = err.message;
        this.snackBar.open(err.message, 'Dismiss', {
          duration: 5000, panelClass: ['snack-error'], verticalPosition: 'top',
        });
      },
    });
  }

  resetForm(): void {
    this.form = {
      firstName:   '',
      lastName:    '',
      email:       '',
      countryCode:  '+91',
      countryLabel: 'IN',
      phone:        '',
      service:      '',
      message:      '',
    };
    this.selectedCountry = this.countryCodes[0];
    this.submitted   = false;
    this.serverError = '';
    // Re-trigger title animation on "Send Another"
    this.titleVisible = false;
    setTimeout(() => { this.titleVisible = true; }, 50);
  }
}
