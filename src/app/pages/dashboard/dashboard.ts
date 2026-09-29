import { ChangeDetectorRef, Component, Input, OnInit, signal } from '@angular/core';

import { HeaderComponent } from '../../components/header/header';
import { DetailsService } from '../../service/details.service';
import { NavComponent } from '../../components/nav/nav';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { DashboardService } from '../../service/dasboard.service';
import { Obra } from '../../models/obras';
import { Terreno } from '../../models/terrenos';
import { Benfeitoria } from '../../models/benfeitorias';
import { FooterComponent } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    NavComponent,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    NgApexchartsModule,
    FooterComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  nomeUsuario: string = '';
  omUsuario: string = '';
  listObras = new Array<Obra>();
  listBenfeitorias = new Array<Benfeitoria>();
  listTerrenos = new Array<Terreno>();
  totalPatrimonio: number = 0;
  showFiller = signal(false);

  // Configuração do gráfico de obras por status
  chartObras = {
    series: [] as number[],

    chart: {
      type: 'pie' as const,
      height: 350,
    },

    labels: [] as string[],

    title: {
      text: 'Obras por status',
      align: 'left' as const,
    },
  };

  // Configuração do gráfico de obras por tipo
  chartTipoObra = {
    series: [
      {
        name: 'Obras',
        data: [] as number[],
      },
    ],

    chart: {
      type: 'bar' as const,
      height: 350,
    },

    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
        barHeight: '60%',
      },
    },

    xaxis: {
      categories: [] as string[],
    },

    dataLabels: {
      enabled: true,
    },

    title: {
      text: 'Obras por tipo',
      align: 'left' as const,
    },
  };

  // Grafico situação das benfeitorias
  chartPatrimonio = {
    series: [
      {
        name: 'Benfeitorias',
        data: [] as number[],
      },
    ],

    chart: {
      type: 'bar' as const,
      height: 350,
    },

    xaxis: {
      categories: [] as string[],
    },

    title: {
      text: 'Benfeitorias por situação',
      align: 'left' as const,
    },

    dataLabels: {
      enabled: true,
    },
  };

  // Configuração do gráfico de terrenos por situação
  chartTerrenosSituacao = {
    series: [] as number[],

    chart: {
      type: 'donut' as const,
      height: 350,
    },

    labels: [] as string[],

    title: {
      text: 'Situação dos terrenos',
      align: 'left' as const,
    },

    dataLabels: {
      enabled: true,
    },

    legend: {
      position: 'bottom' as const,
    },

    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
            },
          },
        },
      },
    },
  };

  // Configuração do grafico de benfeitorias por consevação
  chartBenfeitoriasConservacao = {
    series: [
      {
        name: 'Benfeitorias',
        data: [] as number[],
      },
    ],

    chart: {
      type: 'bar' as const,
      height: 350,
      toolbar: {
        show: false,
      },
    },

    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 6,
      },
    },

    dataLabels: {
      enabled: true,
    },

    xaxis: {
      categories: [] as string[],
      title: {
        text: '',
      },
    },

    yaxis: {
      title: {
        text: 'Quantidade de Benfeitorias',
      },
      min: 0,
    },

    title: {
      text: 'Benfeitorias por Conservação',
      align: 'center' as const,
    },

    tooltip: {
      y: {
        formatter: (value: number) => `${value} benfeitoria(s)`,
      },
    },

    legend: {
      show: false,
    },
  };

  constructor(
    private detailsService: DetailsService,
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    //this.detailsUser();
    this.dashboardObras();
    this.dashboardTerrenos();
    this.dashboardBenfeitorias();
  }

  total() {
    this.totalPatrimonio = this.listBenfeitorias.length + this.listTerrenos.length;
    console.log(this.totalPatrimonio);
  }

  /***************************Detalhes do usuario***********************************/
  detailsUser() {
    this.detailsService.detailsUser().subscribe({
      next: (usuario) => {
        //localStorage.setItem('usuarioNome', usuario.nome);
        //localStorage.setItem('usuarioOM', usuario.unidade.sigla);
        //this.nomeUsuario = usuario.nome;
        //this.omUsuario = usuario.unidade.sigla;
        localStorage.setItem('role', usuario.role);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching user details:', error);
      },
    });
  }

  /***************************Dashboard Obras***********************************/
  dashboardObras() {
    this.dashboardService.dashboardObras().subscribe({
      next: (obras) => {
        this.carregarGraficoObraPorStatus(obras);
        this.carregarGraficoTipoObra(obras);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching dashboard obras:', error);
      },
    });
  }

  carregarGraficoObraPorStatus(obras: Obra[]) {
    this.listObras = obras;
    const status = ['Em andamento', 'Concluída', 'Planejada', 'Paralisada', 'Cancelada'];
    const quantidade = status.map((item) => obras.filter((obra) => obra.status === item).length);
    this.chartObras = { ...this.chartObras, series: quantidade, labels: status };
  }

  carregarGraficoTipoObra(obras: Obra[]) {
    const tipos = ['Construcao', 'Reforma', 'Manutencao', 'Ampliacao'];
    const quantidade = tipos.map((servico) => {
      return obras.filter((obra) => obra.servico === servico).length;
    });

    this.chartTipoObra = {
      ...this.chartTipoObra,
      series: [
        {
          name: 'Obras',
          data: quantidade,
        },
      ],
      xaxis: {
        categories: tipos,
      },
    };
  }

  /***************************Dashboard Terrenos***********************************/
  dashboardTerrenos() {
    this.dashboardService.dashboardTerrenos().subscribe({
      next: (terrenos) => {
        this.listTerrenos = terrenos;
        this.calcularTotalPatrimonio();
        this.carregarGraficoTerrenos(terrenos);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching dashboard terrenos:', error);
      },
    });
  }

  carregarGraficoTerrenos(terrenos: Terreno[]) {
    const situacoes = [...new Set(terrenos.map((terreno) => terreno.situacao))];
    const quantidade = situacoes.map(
      (situacao) => terrenos.filter((terreno) => terreno.situacao === situacao).length,
    );

    this.chartTerrenosSituacao = {
      ...this.chartTerrenosSituacao,
      series: quantidade,
      labels: situacoes,
    };
  }

  /***************************Dashboard Benfeitorias***********************************/
  dashboardBenfeitorias() {
    this.dashboardService.dashboardBenfeitorias().subscribe({
      next: (benfeitorias) => {
        this.listBenfeitorias = benfeitorias;
        this.calcularTotalPatrimonio();
        this.carregarGraficoBenfeitoriasConservacao(benfeitorias);
        this.carregarGraficoSituacao(benfeitorias);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching dashboard terrenos:', error);
      },
    });
  }

  carregarGraficoBenfeitoriasConservacao(benfeitorias: Benfeitoria[]) {
    const conservacoes = [
      ...new Set(benfeitorias.map((benfeitoria) => benfeitoria.conservacao).filter(Boolean)),
    ];
    const quantidade = conservacoes.map(
      (conservacao) =>
        benfeitorias.filter((benfeitoria) => benfeitoria.conservacao === conservacao).length,
    );

    this.chartBenfeitoriasConservacao = {
      ...this.chartBenfeitoriasConservacao,
      series: [
        {
          name: 'Benfeitorias',
          data: quantidade,
        },
      ],
      xaxis: {
        ...this.chartBenfeitoriasConservacao.xaxis,
        categories: conservacoes,
      },
    };
  }

  carregarGraficoSituacao(benfeitorias: Benfeitoria[]) {
    const situacoes = [
      ...new Set(benfeitorias.map((benfeitoria) => benfeitoria.situacao).filter(Boolean)),
    ];
    const quantidade = situacoes.map(
      (situacao) => benfeitorias.filter((benfeitoria) => benfeitoria.situacao === situacao).length,
    );

    this.chartPatrimonio = {
      ...this.chartPatrimonio,

      series: [
        {
          name: 'Benfeitorias',
          data: quantidade,
        },
      ],

      xaxis: {
        ...this.chartPatrimonio.xaxis,
        categories: situacoes,
      },
    };
  }

  calcularTotalPatrimonio() {
    this.totalPatrimonio = this.listTerrenos.length + this.listBenfeitorias.length;
  }
}
