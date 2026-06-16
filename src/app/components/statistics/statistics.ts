import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { StatisticsService } from '../../services/statistics-service';

@Component({
  selector: 'app-statistics',
  imports: [RouterLink],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css',
})

export class Statistics implements AfterViewInit {
  mensaje: string = '';
  tipo: boolean = false;
  estadisticas: any = {};
  statisticsService = inject(StatisticsService);

  constructor(private cd: ChangeDetectorRef){}

  ngOnInit(){
    const temporalidad:string='1m';
    this.statisticsService.getStatisticsByPeriod(temporalidad).subscribe((data) => {
      if (data.error) {
        this.mensaje = data.error;
        return;
      } else {
        console.log(data);
        this.estadisticas = data;
        this.cd.detectChanges();
      }
    });
  }

  ngAfterViewInit() {
    new Chart('salesChart', {
      type: 'bar',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
          label: 'Ventas',
          data: [1200, 1800, 1500, 2200, 2800, 3100],
          backgroundColor: '#003594'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
}