import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from '../app/pages/auth/login/login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Sales-invoice-management');
}
