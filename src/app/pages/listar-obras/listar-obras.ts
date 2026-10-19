import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header';
import { NavComponent } from '../../components/nav/nav';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FooterComponent } from '../../components/footer/footer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DatePipe, NgClass } from '@angular/common';
import { ObraLista } from '../../models/obraList';
import { ObrasService } from '../../service/obras.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { LoadingService } from '../../service/loading.service';
import { DialogService } from '../../service/dialog.service';
import { Obra } from '../../models/obra';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-listar-obras',
  imports: [
    HeaderComponent,
    NavComponent,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FooterComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    DatePipe,
    MatSortModule,
    MatPaginatorModule,
    NgClass,
  ],
  templateUrl: './listar-obras.html',
  styleUrl: './listar-obras.css',
})
export class ListarObrasComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private router = inject(Router);
  filtro = '';

  ELEMENT_DATA: ObraLista[] = [];

  displayedColumns: string[] = [
    'id_cipi',
    'nome',
    'om',
    'tipo_obra',
    'cidade',
    'periodo',
    'status',
    'acoes',
  ];

  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(
    private obrasService: ObrasService,
    private loadingService: LoadingService,
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.loadObras();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Input de pesquisa para filtrar a tabela
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilter(): void {
    this.filtro = '';
    this.dataSource.filter = '';

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadObras() {
    this.obrasService.getObras().subscribe({
      next: (obras) => {
        this.ELEMENT_DATA = obras.map((obra) => ({
          id: obra.id,
          id_cipi: obra.id_cipi,
          nome: obra.nome,
          descricao: obra.descricao,
          om: obra.om,
          tipo_obra: obra.tipo_obra,
          cidade: obra.cidade,
          dataInicio: obra.inicio_obra,
          dataFim: obra.final_obra,
          status: obra.status,
        }));
        this.dataSource.data = this.ELEMENT_DATA;
      },
      error: (error) => {
        console.error('Erro ao carregar obras:', error);
      },
    });
  }

  novaObra(): void {
    // Obtém o timestamp de início do carregamento e exibe o spinner
    const inicioLoading = this.loadingService.show();
    // Oculta o spinner de carregamento
    this.loadingService.hide(inicioLoading);

    // Navega para a página de cadastro de nova obra
    this.router.navigate(['/obras/nova-obra']);
  }

  visualizarObra(id: string): void {
    // Obtém o timestamp de início do carregamento e exibe o spinner
    const inicioLoading = this.loadingService.show();
    // Oculta o spinner de carregamento
    this.loadingService.hide(inicioLoading);

    // Navega para a página de visualização da obra
    this.router.navigate(['/obra/visualizar', id]);
  }

  editarObra(id: string): void {
    // Obtém o timestamp de início do carregamento e exibe o spinner
    const inicioLoading = this.loadingService.show();
    // Oculta o spinner de carregamento
    this.loadingService.hide(inicioLoading);

    // Navega para a página de edição da obra
    this.router.navigate(['/obra/editar', id]);
  }

  excluirObra(obra: Obra): void {
    // abri o dialog de confirmação para exclusão da obra
    this.dialogService
      .abrir({
        title: 'Excluir obra',
        messageBefore: 'Tem certeza de que deseja excluir a obra ',
        highlightText: obra.nome,
        messageAfter: '? Esta ação não poderá ser desfeita.',
        type: 'confirm',
        confirmText: 'Excluir',
        cancelText: 'Cancelar',
      })
      .pipe(
        filter((confirmado) => confirmado === true),
        switchMap(() => this.obrasService.deleteObra(obra.id)),
      )
      .subscribe({
        next: () => {
          // Obtém o timestamp de início do carregamento e exibe o spinner
          const inicioLoading = this.loadingService.show();
          // Oculta o spinner de carregamento
          this.loadingService.hide(inicioLoading);

          // Atualize a listagem de obras aqui.
          this.loadObras();
        },
        error: (erro) => {
          console.error('Erro ao excluir obra:', erro);
        },
      });
  }
}
