import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header';
import { NavComponent } from '../../components/nav/nav';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FooterComponent } from '../../components/footer/footer';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ObrasService } from '../../service/obras.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visualizar-obra',
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
  templateUrl: './visualizar-obra.html',
  styleUrl: './visualizar-obra.css',
})
export class VisualizarObraComponent implements OnInit {
  obraForm!: FormGroup;
  estadosCarregados = false;
  formCriado = false;

  constructor(
    private fb: FormBuilder,
    private obraService: ObrasService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.findById();
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

  findById(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      console.error('ID da obra não encontrado');
      return;
    }

    this.obraService.getObra(id).subscribe({
      next: (obra) => {
        console.log('Obra encontrada:', obra);

        this.obraForm.controls['idCipi'].setValue(obra.id_cipi);
        this.obraForm.controls['tipoObra'].setValue(obra.tipo_obra);
        this.obraForm.controls['nome'].setValue(obra.nome);
        this.obraForm.controls['servico'].setValue(obra.servico);
        this.obraForm.controls['empresaContratada'].setValue(obra.empresa_contratada);
        this.obraForm.controls['descricao'].setValue(obra.descricao);
        this.obraForm.controls['om'].setValue(obra.om);
        this.obraForm.controls['estado'].setValue(obra.estado);
        this.obraForm.controls['cidade'].setValue(obra.cidade);
        this.obraForm.controls['dataInicio'].setValue(obra.inicio_obra);
        this.obraForm.controls['dataFim'].setValue(obra.final_obra);
        this.obraForm.controls['status'].setValue(obra.status);
      },

      error: (error) => {
        console.error('Erro ao buscar obra:', error);
      },
    });
  }

  voltar(): void {
    this.router.navigate(['/obras']);
  }
}
