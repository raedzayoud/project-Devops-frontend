import { Component, OnInit } from '@angular/core';
import { VenteUserModel } from '../../services/models/venteuser';
import { SalesService } from '../../services/api/sales/sales';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tousventes',
  templateUrl: './tousventes.html',
  styleUrls: ['./tousventes.scss'],
  imports: [NgFor, FormsModule],
})
export class Tousventes implements OnInit {
  list: VenteUserModel[] = [];
  idUser: number | null = null;

  constructor(private saleService: SalesService) {}

  ngOnInit(): void {
    this.getVentePerSeller();
  }

  getVentePerSeller() {
    this.idUser = Number(localStorage.getItem('id'));
    if (this.idUser) {
      this.saleService.getAllSalesBySeller(this.idUser).subscribe({
        next: (response: any) => {
          this.list = response.ventes;
          console.log('suceessss===============');
          console.log(this.list);
        },
        error: () => {
          console.log('Error Fetching Data');
        },
      });
    } else {
      console.log('User ID not found in localStorage');
    }
  }

  getUniqueClient(): string[] {
    return [...new Set(this.list.map((v) => v.client_name))];
  }

  getVentesByClient(client: string): VenteUserModel[] {
    return this.list.filter((v) => v.client_name === client);
  }
}
