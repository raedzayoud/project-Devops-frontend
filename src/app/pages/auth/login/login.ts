import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../services/api/auth/authservice';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { UserModel } from '../../../services/models/user';
import { UserService } from '../../../services/api/user/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, HttpClientModule, FormsModule, NgIf, MatSnackBarModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email: string = '';
  password: string = '';
  notifcation: string = '';
  loading: boolean = false;
  user: UserModel | null = null;
  role: string = '';

  constructor(
    private router: Router,
    private authservice: AuthService,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  navigateToRegister() {
    this.router.navigate(['/signup']);
  }

  getSeller() {
    this.userService.getSeller(this.email).subscribe({
      next: (response: any) => {
        this.user = response.user;

        // Save user info in localStorage
        if (this.user) {
          localStorage.setItem('name', this.user.name.toString());
          localStorage.setItem('id', this.user.id.toString());
          localStorage.setItem('email', this.user.email.toString());
          console.log('success=====================');
        }
      },
      error: (err) => {
        console.error('❌ Failed to fetch user:', err);
      },
    });
  }

  Login(form: any) {
    if (form.invalid) {
      this.snackBar.open('❌ Please fill in all required fields.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar'],
      });
      return;
    }

    this.loading = true;
    this.authservice.login(this.email, this.password).subscribe({
      next: (response: any) => {
        this.loading = false;
        if (response.message === 'Email or password incorrect') {
          this.snackBar.open(response.message, 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
        } else {
          // ✅ Save token
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('role', response.role);
          this.role = response.role;
          // ✅ Fetch user info only after successful login
          this.getSeller();
          // Navigate
          if (this.role === 'SELLER') {
            console.log(response.role);
            this.router.navigate(['/seller']);
          } else {
            this.router.navigate(['/admin']);
          }
        }
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('❌ Login failed. Try again.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      },
    });
  }
}
