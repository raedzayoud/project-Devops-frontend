import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { produitService } from '../../services/api/produit/produit';
import { ProduitModel } from '../../services/models/produitmodel';
import { CategorieService } from '../../services/api/categorie/categorie';
import { CategorieModel } from '../../services/models/categorie';
import { FournisseurService } from '../../services/api/fournisseur/fournisseur';
import { FournisseurModel } from '../../services/models/fournisseur';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-produit',
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './produit.html',
  styleUrls: ['./produit.scss'],
})
export class Produit implements OnInit {
  produitModel: ProduitModel[] = [];
  categorieModel: CategorieModel[] = [];
  fournisseurModel: FournisseurModel[] = [];
  showClientForm: boolean = false;

  // Nouveau produit
  newProduit: any = {
    name: '',
    price: 0,
    stock: 0,
    categoryId: null,
    supplierId: null,
  };

  constructor(
    private produitService: produitService,
    private categorieService: CategorieService,
    private fournisseurService: FournisseurService
  ) {}

  ngOnInit(): void {
    this.getAllProduct();
    this.getAllCategorie();
    this.getAllFournisseur();
  }

  getAllProduct() {
    this.produitService.getAllProduits().subscribe({
      next: (response: any) => {
        this.produitModel = response.products;
      },
      error: () => console.log('Erreur lors du chargement des produits'),
    });
  }

  getAllCategorie() {
    this.categorieService.getAllCategorie().subscribe({
      next: (response: any) => (this.categorieModel = response.categories),
      error: () => console.log('Erreur lors du chargement des catégories'),
    });
  }

  getAllFournisseur() {
    this.fournisseurService.getAllFournisseur().subscribe({
      next: (response: any) => (this.fournisseurModel = response),
      error: () => console.log('Erreur lors du chargement des fournisseurs'),
    });
  }

  openClientForm() {
    this.showClientForm = true;
  }

  closeClientForm() {
    this.showClientForm = false;
  }

  // Ajouter un produit
  ajouterProduit() {
    this.produitService.addProduit(this.newProduit).subscribe({
      next: (response: any) => {
        console.log('Produit ajouté:', response);
        this.produitModel.push(response); // Ajouter localement à la liste
        this.closeClientForm();
        // Réinitialiser le formulaire
        this.newProduit = {
          name: '',
          price: 0,
          stock: 0,
          categoryId: null,
          supplierId: null,
        };
        this.getAllProduct();
      },
      error: (err) => console.log("Erreur lors de l'ajout du produit", err),
    });
  }
}
