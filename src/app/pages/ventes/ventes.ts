import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduitModel } from '../../services/models/produitmodel';
import { produitService } from '../../services/api/produit/produit';
import { ClientService } from '../../services/api/client/client';
import { ClientModel } from '../../services/models/client';
import { PanierService } from '../../services/api/panier/panier';
import { PanierModel } from '../../services/models/panier';
import { SharedclientService } from '../../services/shared/sharedclient';

interface CartItem {
  product: ProduitModel;
  quantity: number;
}

@Component({
  selector: 'app-ventes',
  imports: [NgFor, NgIf, FormsModule, CommonModule],
  templateUrl: './ventes.html',
  styleUrl: './ventes.scss',
  standalone: true,
})
export class ventes implements OnInit {
  constructor(
    private produitService: produitService,
    private clientService: ClientService,
    private panierService: PanierService,
    private sharedClientService: SharedclientService
  ) {}
  products: ProduitModel[] = [];
  cart: CartItem[] = [];
  panier: PanierModel | null = null;
  loading = true;
  client: ClientModel | null = null;
  loadingClient = true;
  email: string = '';
  errorMessage: String = '';
  successMessage: String = '';

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.produitService.getAllProduits().subscribe({
      next: (data: any) => {
        this.products = data.products;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  get subtotal() {
    return this.cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }
  get total() {
    return this.subtotal;
  }
  addToCart(product: any) {
    if (product.stock > 0) {
      let item = this.cart.find((i) => i.product.name === product.name);
      if (item) {
        item.quantity++;
      } else {
        this.cart.push({ product, quantity: 1 });
      }
      product.stock--;
    }
  }

  increaseQwuantity(item: any) {
    if (item.product.stock > 0) {
      item.quantity++;
      item.product.stock--;
    }
  }

  decreaseQwuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      item.product.stock++;
    } else {
      this.removeItem(item);
    }
  }

  removeItem(item: any) {
    item.product.stock += item.quantity;
    this.cart = this.cart.filter((i) => i !== item);
  }

  clearCart() {
    this.cart.forEach((item) => {
      item.product.stock += item.quantity;
    });
    this.cart = [];
  }

  savePanier() {
    this.sharedClientService.client$.subscribe((client) => {
      this.client = client;
    });
    console.log(this.client);
    if (this.cart.length === 0) return;

    if (!this.client || !this.client.id) {
      this.errorMessage = '⚠️ Vous devez ajouter un client avant de continuer';
      return;
    }

    this.errorMessage = ''; // clear old errors

    // build panier object from cart
    const panier: PanierModel = {
      totalPrice: this.total,
      client_id: this.client?.id ?? 0,
      user_id: parseInt(localStorage.getItem('id') || '0'), // from localStorage
      produit: this.cart.map((item) => ({
        product_id: item.product.id, // adapt field name if different
        price: item.product.price,
        quantity: item.quantity,
        total: item.product.price * item.quantity,
      })),
    };

    this.panierService.savePanier(panier).subscribe({
      next: (response: any) => {
        this.successMessage = '✅ Panier enregistré avec succès !';
        this.getProduct();
        this.clearCart();
      },
      error: (err) => {
        console.error('❌ Failed to save panier:', err);
      },
    });
  }
}
