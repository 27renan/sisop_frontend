import { Component, OnInit, afterNextRender } from '@angular/core';
import { HeaderComponent } from '../../components/header/header';
import { NavComponent } from '../../components/nav/nav';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FooterComponent } from '../../components/footer/footer';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { Estado, ESTADOS } from '../../models/estados';
import { Cidade } from '../../models/cidades';
import { LocalidadesService } from '../../service/localidade.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-cadastro-obra',
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
  ],
  templateUrl: './cadastro-obra.html',
  styleUrl: './cadastro-obra.css',
})
export class CadastroObraComponent implements OnInit {
  estados: Estado[] = ESTADOS;
  cidades: Cidade[] = [];
  obraForm!: FormGroup;

  estadosCarregados = false;
  formCriado = false;

  constructor(
    private localidadesService: LocalidadesService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.obraForm = this.fb.group({
      idCipi: this.fb.control(''),
      tipoObra: this.fb.control(''),
      nome: this.fb.control(''),
      servico: this.fb.control(''),
      empresaContratada: this.fb.control(''),
      descricao: this.fb.control(''),
      om: this.fb.control(''),
      estado: this.fb.control(null),
      cidade: this.fb.control(null),
      dataInicio: this.fb.control(''),
      dataFim: this.fb.control(''),
      status: this.fb.control(''),
    });
  }

  /*carregarEstados(): void {
    this.localidadesService.getEstados().subscribe({
      next: (dados) => {
        this.estados = dados;
      },
      error: (erro) => {
        console.error('Erro ao carregar estados:', erro);
      },
    });
  }*/

  buscarCidades(idEstado: number): void {
    if (!idEstado) {
      this.cidades = [];
      return;
    }

    this.localidadesService.getCidadesPorEstado(idEstado).subscribe({
      next: (dados) => {
        this.cidades = dados;

        // opcional: limpa a cidade quando muda o estado
        this.obraForm.get('cidade')?.setValue('');
      },
      error: (erro) => {
        console.error('Erro ao carregar cidades:', erro);
        this.cidades = [];
      },
    });
  }

  onSubmit() {
    console.log(this.obraForm.value);
  }
}
