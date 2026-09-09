import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/home/dashboard';
import { authGuard } from './auth/auth.guard';
import { CadastroObraComponent } from './pages/cadastro-obra/cadastro-obra';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'home',
    component: DashboardComponent,
    canActivate: [authGuard],
  },

  {
    path: 'obras',
    component: CadastroObraComponent,
    canActivate: [authGuard],
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];
