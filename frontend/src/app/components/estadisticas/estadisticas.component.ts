import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  view: [number,number] = [700, 400];
  view2: [number,number] = [700, 400];
  // Primer gráfico
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  //SegundoGráfico
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient2: boolean = false;
  showLegend2: boolean = true;
  legendPosition: any = 'below';
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Categorías';
  showYAxisLabel: boolean = true;
  xAxisLabel = 'Cantidad de Productos';
  schemeType: any = 'linear';

  //Tercer Gráfico
  showXAxis2: boolean = true;
  showYAxis2: boolean = true;
  gradient3: boolean = false;
  showLegend3: boolean = true;
  showXAxisLabel2: boolean = true;
  xAxisLabel2: string = 'Usuarios';
  showYAxisLabel2: boolean = true;
  yAxisLabel2: string = 'Calificación';
  legendTitle: string = 'Estrellas'


 single = [
    {
      "name": "Atlántida",
      "value": 10
    },
    {
      "name": "Colón",
      "value": 5
    },
    {
      "name": "Comayagua",
      "value": 3
    },
      {
      "name": "Cotés",
      "value": 1
    }
  ];

  multi = [
    {
      "name": "Muebles",
      "series": [
        {
          "name": "Productos",
          "value": 6
        }
      ]
    },
  
    {
      "name": "Celulares",
      "series": [
        {
          "name": "Productos",
          "value": 4
        }
      ]
    },
  
    {
      "name": "Ropa",
      "series": [
        {
          "name": "Productos",
          "value": 2
        }
      ]
    }
  ];
  multi2 = [
    {
      "name": "Usuario1",
      "series": [
        {
          "name": "Estrellas",
          "value": 3
        }
      ]
    },
  
    {
      "name": "Usuario2",
      "series": [
        {
          "name": "Estrellas",
          "value": 4
        }
      ]
    },
  
    {
      "name": "Usuario3",
      "series": [
        {
          "name": "Estrellas",
          "value": 2
        }
      ]
    }
  ];
  
  constructor() {
   // Object.assign(this, { single });
   }

  ngOnInit(): void {
  }
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
