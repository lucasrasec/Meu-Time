import { Component, Input } from '@angular/core';
import { ChartTypeRegistry } from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent {
  @Input() data: any;

  chartData: any[] = [];
  chartLabels: string[] = [];
  chartType: keyof ChartTypeRegistry = 'bar';
  chartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  ngOnInit() {
    this.chartData = [
      {
        data: Object.keys(this.data).map((key) => this.data[key].total),
        label: 'Gols',
      },
    ];
    this.chartLabels = Object.keys(this.data);
  }
}
