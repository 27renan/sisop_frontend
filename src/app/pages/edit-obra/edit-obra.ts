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
import { ToastrService } from 'ngx-toastr';
import { ObrasService } from '../../service/obras.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-obra',
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
  templateUrl: './edit-obra.html',
  styleUrl: './edit-obra.css',
})
export class EditObraComponent implements OnInit {
  estados: Estado[] = ESTADOS;
  cidades: Cidade[] = [];
  obraForm!: FormGroup;
  estadosCarregados = false;
  formCriado = false;
  idObra: string | null = null;

  constructor(
    private localidadesService: LocalidadesService,
    private obraService: ObrasService,
    private toast: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Inicializa o formulário ao carregar o componente
    this.createForm();
    // trazer os dados da obra para edição
    this.carregaObraParaEdicao();
  }

  createForm() {
    this.obraForm = this.fb.group({
      id_cipi: this.fb.control(''),
      tipo_obra: this.fb.control(''),
      nome: this.fb.control(''),
      servico: this.fb.control(''),
      empresa_contratada: this.fb.control(''),
      descricao: this.fb.control(''),
      om: this.fb.control(''),
      estado: this.fb.control(null),
      cidade: this.fb.control(null),
      inicio_obra: this.fb.control(''),
      final_obra: this.fb.control(''),
      status: this.fb.control(''),
    });
  }

  carregaObraParaEdicao(): void {
    this.idObra = this.route.snapshot.paramMap.get('id');

    if (!this.idObra) {
      console.error('ID da obra não encontrado');
      return;
    }

    this.obraService.getObra(this.idObra).subscribe({
      next: (obra) => {
        // Encontra o estado
        const estadoSelecionado = this.estados.find(
          (estado) => estado.nome === obra.estado.split(' - ')[0],
        );

        // Preenche os campos que não dependem das cidades
        this.obraForm.patchValue({
          id_cipi: obra.id_cipi,
          tipo_obra: obra.tipo_obra,
          nome: obra.nome,
          servico: obra.servico,
          empresa_contratada: obra.empresa_contratada,
          descricao: obra.descricao,
          om: obra.om,
          estado: estadoSelecionado?.id,
          inicio_obra: obra.inicio_obra,
          final_obra: obra.final_obra,
          status: obra.status,
        });

        // Carrega as cidades do estado
        if (estadoSelecionado?.id) {
          this.localidadesService.getCidadesPorEstado(estadoSelecionado.id).subscribe({
            next: (dados) => {
              this.cidades = dados;
              // Encontra a cidade
              const cidadeSelecionada = this.cidades.find((cidade) => cidade.nome === obra.cidade);
              // Define a cidade no formulário
              this.obraForm.patchValue({
                cidade: cidadeSelecionada?.id,
              });
            },

            error: (erro) => {
              console.error('Erro ao carregar cidades:', erro);
              this.cidades = [];
            },
          });
        }
      },

      error: (error) => {
        console.error('Erro ao buscar obra:', error);
      },
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

    //Seleciona a cidade pelo id e retorna o nome da cidade
    const cidade = await firstValueFrom(this.localidadesService.getCidade(idCidade));
    // Atualiza o formulário com os nomes do estado e cidade selecionados
    this.obraForm.patchValue({
      estado: `${estadoSelecionado.nome} - ${estadoSelecionado.sigla}`,
      cidade: cidade.nome,
    });
  }

  // Método para preparar os dados da obra antes de enviar
  private prepararDadosObra() {
    const form = this.obraForm.value;
    // Converte as datas para o formato ISO antes de enviar
    return {
      ...form,
      inicio_obra: new Date(form.inicio_obra).toISOString(),
      final_obra: new Date(form.final_obra).toISOString(),
    };
  }

  // Método para enviar os dados da obra para o serviço de criação
  async onSubmit(): Promise<void> {
    try {
      // Verifica se o ID da obra está presente
      if (!this.idObra) {
        this.toast.error('ID da obra não encontrado.', 'Atualizar obra');
        return;
      }

      // Buscar e preencher os nomes do estado e da cidade antes de enviar os dados
      await this.buscarCidade();

      // Preparar os dados da obra para envio
      const dadosObra = this.prepararDadosObra();

      // Enviar os dados da obra para o serviço de criação
      this.obraService.updateObra(this.idObra, dadosObra).subscribe({
        next: (obra) => {
          this.toast.success('Obra atualizada com sucesso!', 'Atualizar obra', {
            timeOut: 7000,
          });
          this.router.navigate(['/obras']);
          //this.obraForm.reset();
          //this.cidades = [];
        },

        error: (erro) => {
          console.error('Erro ao atualizar obra:', erro);
          this.toast.error('Erro ao atualizar obra!', 'Atualizar obra', {
            timeOut: 7000,
          });
        },
      });
    } catch (erro) {
      console.error('Erro ao preparar atualização:', erro);
      this.toast.error('Não foi possível preparar a atualização da obra.', 'Atualizar obra', {
        timeOut: 7000,
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/obras']);
  }
}
