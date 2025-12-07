import { Component, OnInit } from '@angular/core';
import { ProduitModel } from '../../services/models/produitmodel';
import { produitService } from '../../services/api/produit/produit';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-voirproduits',
  imports: [NgFor, NgIf, FormsModule, CommonModule],
  templateUrl: './voirproduits.html',
  styleUrl: './voirproduits.scss',
})
export class Voirproduits implements OnInit {
  produits: ProduitModel[] = [];
  loading = true;
  totalProduit = 0;
  stockFaible = 0;
  stockCritique = 0;
  valeurStock = 0;

  constructor(protected produitService: produitService) {}

  ngOnInit(): void {
    this.produitService.getAllProduits().subscribe({
      next: (data: any) => {
        this.produits = data.products;
        this.calculerStats();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  calculerStats() {
    this.totalProduit = this.produits.length;

    this.stockFaible = this.produits.filter(
      (p) => p.stock > 0 && p.stock <= 5
    ).length;
    this.stockCritique = this.produits.filter((p) => p.stock <= 2).length;

    this.valeurStock = this.produits.reduce(
      (sum, p) => sum + p.price * p.stock,
      0
    );
  }
  // pour déterminer le statut
  getStatut(stock: number): string {
    if (stock <= 2) return 'Critique';
    if (stock <= 5) return 'Stock faible';
    return 'En stock';
  }

  getStatutClass(stock: number): string {
    if (stock <= 2) return 'stock-critique';
    if (stock <= 5) return 'stock-faible';
    return 'en-stock';
  }
}
