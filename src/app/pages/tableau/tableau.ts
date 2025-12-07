// tableau.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-tableau',
  standalone: true,
  imports: [RouterLink, BaseChartDirective], // Fixed: Import BaseChartDirective
  templateUrl: './tableau.html',
  styleUrls: ['./tableau.scss'],
})
export class Tableau {
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre'],
    datasets: [
      {
        data: [120, 190, 170, 220, 250, 300],
        label: 'Ventes',
        fill: true,
        tension: 0.3,
        borderColor: '#27ae60',
        backgroundColor: 'rgba(39, 174, 96, 0.2)',
      },
      {
        data: [2000, 3500, 3000, 4000, 4500, 5000],
        label: 'Revenus (€)',
        fill: true,
        tension: 0.3,
        borderColor: '#2980b9',
        backgroundColor: 'rgba(41, 128, 185, 0.2)',
      },
    ],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  public lineChartLegend = true;
}
