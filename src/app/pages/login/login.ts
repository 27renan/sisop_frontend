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
    this.creds = this.loginForm.value;
    this.service.authenticate(this.creds).subscribe({
      next: (response) => {
        const authorization = response.token;

        if (!authorization) {
          this.toast.error('Token não retornado pelo servidor.');
          return;
        }

        const token = authorization.replace('Bearer ', '');

        this.service.successfulLogin(token);

        this.toast.success('Login realizado com sucesso', 'Login', {
          timeOut: 7000,
        });

        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 0);

        //this.router.navigate(['/home']);
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
