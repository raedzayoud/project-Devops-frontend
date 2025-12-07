import { Component, OnInit } from '@angular/core';
import { CategorieModel } from '../../services/models/categorie';
import { CategorieService } from '../../services/api/categorie/categorie';
import { NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categorie',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule], // ✅ ajout FormsModule
  templateUrl: './categorie.html',
  styleUrl: './categorie.scss',
})
export class Categorie implements OnInit {
  showClientForm: boolean = false;
  categorieModel: CategorieModel[] = [];
  name: string = '';

  constructor(private categorieService: CategorieService) {}

  ngOnInit(): void {
    this.getAllCategorie();
  }

  getAllCategorie() {
    this.categorieService.getAllCategorie().subscribe({
      next: (response: any) => {
        this.categorieModel = response.categories;
      },
      error: () => {
        console.log('❌ error when fetching data');
      },
    });
  }

  openClientForm() {
    this.showClientForm = true;
  }

  closeClientForm() {
    this.showClientForm = false;
    this.name = ''; // reset champ
  }

  ajouterCategorie() {
    if (!this.name.trim()) return;

    this.categorieService.addCategorie(this.name).subscribe({
      next: () => {
        this.getAllCategorie();
        this.closeClientForm();
      },
      error: () => {
        console.log('❌ error when adding categorie');
      },
    });
  }
}
