// src/app/components/contact/contact.component.ts
import { Component } from '@angular/core';
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
export class ContactComponent {

  contactItems: ContactItem[] = [
    { icon: 'mail_outline', label: 'Email',           value: 'Admin@bluekod.com' },
    { icon: 'schedule',     label: 'Working Hours',   value: 'Mon – Fri, 9am – 6pm IST' },
    { icon: 'location_on',  label: 'Location',        value: 'Remote — Available Worldwide' },
    { icon: 'phone',        label: 'Phone / WhatsApp',value: '+91 98765 43210' },
  ];

  services = [
    'Website Development',
    'AI Development',
    'Logo & Brand Design',
    'Full Package',
    'Something Custom',
  ];

  form = { firstName: '', lastName: '', email: '', service: '', message: '' };
  submitted   = false;
  loading     = false;
  serverError = '';

  constructor(
    private snackBar: MatSnackBar,
    private contactService: ContactService,
  ) {}

  onSubmit(): void {
    if (!this.form.firstName.trim() || !this.form.email.trim() || !this.form.message.trim()) {
      this.snackBar.open('Please fill in all required fields.', 'OK', {
        duration: 3500, panelClass: ['snack-error'], verticalPosition: 'top',
      });
      return;
    }
    this.loading = true;
    this.serverError = '';

    this.contactService.submitContact(this.form).subscribe({
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
    this.form        = { firstName: '', lastName: '', email: '', service: '', message: '' };
    this.submitted   = false;
    this.serverError = '';
  }
}
