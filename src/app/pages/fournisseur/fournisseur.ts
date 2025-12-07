import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FournisseurModel } from '../../services/models/fournisseur';
import { FournisseurService } from '../../services/api/fournisseur/fournisseur';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fournisseur',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './fournisseur.html',
  styleUrl: './fournisseur.scss',
})
export class Fournisseur implements OnInit {
  searchText: string = '';
  showClientForm: boolean = false;
  fournisseurModel: FournisseurModel[] = [];
  name: string = '';
  phone: string = '';

  constructor(private fournisseurService: FournisseurService) {}

  ngOnInit(): void {
    this.getAllFournisseur();
  }

  getAllFournisseur() {
    this.fournisseurService.getAllFournisseur().subscribe({
      next: (response: any) => {
        this.fournisseurModel = response;
      },
      error: () => {
        console.log('❌ Erreur lors du chargement des fournisseurs');
      },
    });
  }

  openClientForm() {
    this.showClientForm = true;
  }

  closeClientForm() {
    this.showClientForm = false;
    this.name = '';
    this.phone = '';
  }

  ajouterFournisseur() {
    if (!this.name.trim() || !this.phone.trim()) return;

    this.fournisseurService.addFournisseur(this.name, this.phone).subscribe({
      next: () => {
        this.getAllFournisseur(); // refresh liste
        this.closeClientForm(); // fermer modal
      },
      error: () => {
        console.log('❌ Erreur lors de l’ajout du fournisseur');
      },
    });
  }
}
