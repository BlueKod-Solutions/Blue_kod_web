// src/app/components/contact/contact.component.ts
<<<<<<< HEAD
import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
=======
import { Component } from '@angular/core';
>>>>>>> fa3d71a791777d93ddab996af85eecf12ebaa5a1
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
<<<<<<< HEAD
export class ContactComponent implements OnInit, OnDestroy {

  contactItems: ContactItem[] = [
    { icon: 'mail_outline', label: 'Email',            value: 'admin@bluekod.com' },
    { icon: 'telegram',          label: 'Telegram',          value: '@bluekod' },
    { icon: 'schedule',     label: 'Working Hours',    value: 'Mon – Sat, 9am – 6pm IST' },
    { icon: 'location_on',  label: 'Location',         value: 'Remote — Available Worldwide' },
    { icon: 'phone',        label: 'Phone / WhatsApp', value: '+91 7026032850/ 9972654250' },
=======
export class ContactComponent {

  contactItems: ContactItem[] = [
    { icon: 'mail_outline', label: 'Email',           value: 'Admin@bluekod.com' },
    { icon: 'schedule',     label: 'Working Hours',   value: 'Mon – Fri, 9am – 6pm IST' },
    { icon: 'location_on',  label: 'Location',        value: 'Remote — Available Worldwide' },
    { icon: 'phone',        label: 'Phone / WhatsApp',value: '+91 98765 43210' },
>>>>>>> fa3d71a791777d93ddab996af85eecf12ebaa5a1
  ];

  services = [
    'Website Development',
    'AI Development',
    'Logo & Brand Design',
    'Full Package',
    'Something Custom',
  ];

<<<<<<< HEAD
  // Country codes for the phone field selector
  countryCodes = [
    { flag: '🇮🇳', code: '+91',  label: 'IN' },
    { flag: '🇺🇸', code: '+1',   label: 'US' },
    { flag: '🇬🇧', code: '+44',  label: 'GB' },
    { flag: '🇦🇪', code: '+971', label: 'AE' },
    { flag: '🇸🇬', code: '+65',  label: 'SG' },
    { flag: '🇦🇺', code: '+61',  label: 'AU' },
    { flag: '🇨🇦', code: '+1',   label: 'CA' },
    { flag: '🇩🇪', code: '+49',  label: 'DE' },
  ];

  form = {
    firstName:   '',
    lastName:    '',
    email:       '',
    countryCode: '+91',   // default India
    phone:       '',
    service:     '',
    message:     '',
  };

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

=======
  form = { firstName: '', lastName: '', email: '', service: '', message: '' };
  submitted   = false;
  loading     = false;
  serverError = '';

  constructor(
    private snackBar: MatSnackBar,
    private contactService: ContactService,
  ) {}

>>>>>>> fa3d71a791777d93ddab996af85eecf12ebaa5a1
  onSubmit(): void {
    if (!this.form.firstName.trim() || !this.form.email.trim() || !this.form.message.trim()) {
      this.snackBar.open('Please fill in all required fields.', 'OK', {
        duration: 3500, panelClass: ['snack-error'], verticalPosition: 'top',
      });
      return;
    }
<<<<<<< HEAD
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
=======
    this.loading = true;
    this.serverError = '';

    this.contactService.submitContact(this.form).subscribe({
>>>>>>> fa3d71a791777d93ddab996af85eecf12ebaa5a1
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
<<<<<<< HEAD
    this.form = {
      firstName:   '',
      lastName:    '',
      email:       '',
      countryCode: '+91',
      phone:       '',
      service:     '',
      message:     '',
    };
    this.submitted   = false;
    this.serverError = '';
    // Re-trigger title animation on "Send Another"
    this.titleVisible = false;
    setTimeout(() => { this.titleVisible = true; }, 50);
=======
    this.form        = { firstName: '', lastName: '', email: '', service: '', message: '' };
    this.submitted   = false;
    this.serverError = '';
>>>>>>> fa3d71a791777d93ddab996af85eecf12ebaa5a1
  }
}
