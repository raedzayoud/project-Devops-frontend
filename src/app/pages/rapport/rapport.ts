import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RapportService } from '../../services/api/rapport/rapport';
import { RapportModel } from '../../services/models/rapport';
import { SalesService } from '../../services/api/sales/sales';

@Component({
  selector: 'app-rapport',
  imports: [NgFor, FormsModule],
  templateUrl: './rapport.html',
  styleUrl: './rapport.scss',
})
export class Rapport implements OnInit {
  rapportModel: RapportModel[] = [];
  totalPrice: number = 0;
  clientCount: number = 0;
  constructor(
    private rapportService: RapportService,
    private salesService: SalesService
  ) {}
  ngOnInit(): void {
    this.getAllRapport();
    this.getClientCount();
  }
  getAllRapport() {
    this.rapportService.getAllRapport().subscribe({
      next: (response: any) => (this.rapportModel = response),
      error: () => console.log('Erreur lors du chargement de rapport '),
    });
  }

  getClientCount() {
    this.salesService.getClientCount().subscribe({
      next: (response: any) => {
        this.clientCount = response.clientsCount ?? response;
      },
      error: () =>
        console.log('Erreur lors du chargement du nombre de clients'),
    });
  }

  getTotalVente(): number {
    return this.rapportModel.reduce((sum, r) => sum + r.totalPrice, 0);
  }

  getTotalProduitsVendus(): number {
    return this.rapportModel.reduce((sum, r) => sum + r.quantity, 0);
  }
}
