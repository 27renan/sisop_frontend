import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { Credenciais } from '../../models/credenciais';
import { AppCookieService } from '../../service/cookie.service';
import { DetailsService } from '../../service/details.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  creds: Credenciais = {
    email: '',
    senha: '',
  };

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private service: AuthService,
    private router: Router,
    private appCookieService: AppCookieService,
    private detailsService: DetailsService,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      senha: this.fb.control('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit() {
    // Atualiza as credenciais com os valores do formulário
    this.creds = this.loginForm.value;
    this.service.authenticate(this.creds).subscribe({
      next: (response) => {
        // Extrai o token da resposta
        const authorization = response.token;
        // Verifica se o token foi retornado
        if (!authorization) {
          this.toast.error('Token não retornado pelo servidor.');
          return;
        }
        // Remove o prefixo "Bearer " do token, se presente
        const token = authorization.replace('Bearer ', '');

        // Salva o token
        this.service.successfulLogin(token);

        // Busca os dados completos do usuário
        this.detailsService.detailsUser().subscribe({
          next: (usuario) => {
            // Salva o usuário completo no cookie
            this.appCookieService.salvarUsuario(usuario);
            this.toast.success('Login realizado com sucesso', 'Login', {
              timeOut: 7000,
            });
            // Redireciona para a página home após o login bem-sucedido
            this.router.navigate(['/home']);
          },

          error: (error) => {
            console.error('Erro ao buscar dados do usuário:', error);
            this.toast.error('Não foi possível carregar os dados do usuário.');
          },
        });
      },

      error: () => {
        this.toast.error('Usuário e/ou senha inválidos');
      },
    });
  }

  validaCampos(): boolean {
    return (
      this.loginForm.get('email')?.valid === true && this.loginForm.get('senha')?.valid === true
    );
  }
}
