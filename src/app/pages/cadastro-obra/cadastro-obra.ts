import { Component, OnInit } from '@angular/core';
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

import { firstValueFrom } from 'rxjs';
import { CreateObraService } from '../../service/createObra.service';
import { ToastrService } from 'ngx-toastr';

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
    private createObraService: CreateObraService,
    private toast: ToastrService,
    private fb: FormBuilder,
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

  // Método para listar cidades com base no estado selecionado
  listaCidades(idEstado: number): void {
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

  // Método para buscar o nome do estado e cidade selecionados
  private async buscarCidade(): Promise<void> {
    const idEstado = this.obraForm.get('estado')?.value;
    const idCidade = this.obraForm.get('cidade')?.value;

    const estadoSelecionado = this.estados.find((estado) => estado.id === idEstado);

    if (!estadoSelecionado || !idCidade) {
      throw new Error('Estado ou cidade não selecionados.');
    }
    const cidade = await firstValueFrom(this.localidadesService.getCidade(idCidade));
    this.obraForm.patchValue({
      estado: `${estadoSelecionado.nome} - ${estadoSelecionado.sigla}`,
      cidade: cidade.nome,
    });
  }

  // Método para preparar os dados da obra antes de enviar
  private prepararDadosObra() {
    const form = this.obraForm.value;
    return {
      ...form,
      dataInicio: new Date(form.dataInicio).toISOString(),
      dataFim: new Date(form.dataFim).toISOString(),
    };
  }

  // Método para enviar os dados da obra para o serviço de criação
  async onSubmit(): Promise<void> {
    try {
      // Buscar e preencher os nomes do estado e cidade antes de enviar os dados
      await this.buscarCidade();

      // Preparar os dados da obra para envio
      const dadosObra = this.prepararDadosObra();

      // Enviar os dados da obra para o serviço de criação
      this.createObraService.createObra(dadosObra).subscribe({
        next: (obra) => {
          this.toast.success('Obra cadastrada com sucesso!', 'Cadastro de obras', {
            timeOut: 7000,
          });
          this.obraForm.reset();
          this.cidades = [];
        },

        error: (erro) => {
          console.error('Erro ao cadastrar obra:', erro);
          this.toast.error('Erro ao cadastrar obra!', 'Cadastro de obras', {
            timeOut: 7000,
          });
        },
      });
    } catch (erro) {
      console.error('Erro ao preparar cadastro:', erro);
      this.toast.error('Não foi possível preparar o cadastro da obra.', 'Cadastro de obras', {
        timeOut: 7000,
      });
    }
  }
}
