import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {
  activeLink: string = 'tableau'; // default active link

  constructor(private router: Router) {}

  setActive(link: string) {
    this.activeLink = link;
    this.router.navigate(['admin', link]); // navigate to child route
  }

  Deconnexion() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
