import { CanActivate, Router, Routes } from '@angular/router';
import { Singup } from '../app/pages/auth/singup/singup';
import { Login } from '../app/pages/auth/login/login';
import { Seller } from './pages/seller/seller';
import { Voirproduits } from './pages/voirproduits/voirproduits';
import { Tousventes } from './pages/tousventes/tousventes';
import { Admin } from './pages/admin/admin';
import { Tableau } from './pages/tableau/tableau';
import { Produit } from './pages/produit/produit';
import { Categorie } from './pages/categorie/categorie';
import { Fournisseur } from './pages/fournisseur/fournisseur';
import { Rapport } from './pages/rapport/rapport';
import { Injectable } from '@angular/core';
import { ventes } from './pages/ventes/ventes';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');

    if (token && role === 'SELLER') {
      return true; // allow access
    } else {
      this.router.navigate(['/login']); // block access
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');

    if (token && role === 'ADMIN') {
      return true; // allow access
    } else {
      this.router.navigate(['/login']); // block access
      return false;
    }
  }
}

export const routes: Routes = [
  { path: '', redirectTo: 'seller', pathMatch: 'full' },

  { path: 'signup', component: Singup }, // corrected

  { path: 'login', component: Login },

  {
    path: 'seller',
    component: Seller,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'ventes', pathMatch: 'full' },
      { path: 'voirproduits', component: Voirproduits },
      { path: 'ventes', component: ventes },
      { path: 'tousventes', component: Tousventes },
    ],
  },

  {
    path: 'admin',
    component: Admin,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'tableau', pathMatch: 'full' },
      { path: 'tableau', component: Tableau },
      { path: 'produit', component: Produit },
      { path: 'categorie', component: Categorie },
      { path: 'fournisseur', component: Fournisseur },
      { path: 'rapport', component: Rapport },
    ],
  },
];
