import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ClientService } from '../../services/api/client/client';
import { SharedclientService } from '../../services/shared/sharedclient';

@Component({
  selector: 'app-seller',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink, RouterOutlet],
  templateUrl: './seller.html',
  styleUrls: ['./seller.scss'],
})
export class Seller {
  email: string = '';
  loadingClient = false;
  showClientForm = false;

  emailUser: string | null = localStorage.getItem('email');
  name: string | null = localStorage.getItem('name');

  idUser: number | null = Number(localStorage.getItem('id'));

  client: any = null;
  errorMessage: string = '';
  successMessage: string = '';
  buttonDisabled = false;

  constructor(
    private clientService: ClientService,
    private sharedclientService: SharedclientService,
    private router: Router
  ) {}

  openClientForm() {
    this.showClientForm = true;
    this.errorMessage = '';
    this.client = null;
  }

  closeClientForm() {
    this.showClientForm = false;
    this.email = '';
    this.errorMessage = '';
    //   this.client = null;
  }

  searchClient() {
    if (!this.email) return;

    this.loadingClient = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.client = null;

    this.clientService.getClient(this.email).subscribe({
      next: (data: any) => {
        this.client = data.client;
        this.sharedclientService.setClient(this.client);
        this.successMessage = '✅ Client trouvé avec succès';
        this.loadingClient = false;
        this.closeClientForm();
      },
      error: (err) => {
        console.error('Erreur lors de la recherche du client', err);
        this.errorMessage =
          err.error?.error || 'Impossible de trouver le client.';
        this.loadingClient = false;
      },
    });
  }

  Deconnexion() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
