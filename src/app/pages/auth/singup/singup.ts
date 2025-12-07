import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../services/api/auth/authservice';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [RouterLink, NgIf, FormsModule, MatSnackBarModule],
  templateUrl: './singup.html',
  styleUrls: ['./singup.scss'],
})
export class Singup {
  name = '';
  phone = '';
  email = '';
  password = '';
  confirmPassword = '';
  notifcation = '';
  loading = false;
  submitted = false;

  constructor(
    private router: Router,
    private authservice: AuthService,
    private snackBar: MatSnackBar
  ) {}

  passwordMismatch() {
    return (
      this.password &&
      this.confirmPassword &&
      this.password !== this.confirmPassword
    );
  }

  onSubmit(form?: NgForm) {
    this.submitted = true;

    if (form?.invalid || this.passwordMismatch()) {
      this.showNotification('Please fix the validation errors');
      return;
    }

    this.loading = true;
    this.authservice.signup(this.name, this.email, this.password).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.snackBar.open(response.message || 'Signed up successfully', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });

        this.name = this.email = this.password = this.confirmPassword = '';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (error: any) => {
        this.loading = false;
        let message = 'An error occurred';
        if (error.status === 422 && error.error?.errors) {
          const firstError = Object.values(error.error.errors)[0] as string[];
          message = firstError[0];
        } else if (error.error?.error) {
          message = error.error.error;
        }

        this.snackBar.open(message, 'Close', {
          verticalPosition: 'top',
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  showNotification(message: string) {
    this.notifcation = message;
    setTimeout(() => (this.notifcation = ''), 5000);
  }
}
