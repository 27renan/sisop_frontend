import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/home/dashboard';
import { authGuard } from './auth/auth.guard';
import { CadastroObraComponent } from './pages/cadastro-obra/cadastro-obra';
import { ListarObrasComponent } from './pages/listar-obras/listar-obras';

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
    component: ListarObrasComponent,
    canActivate: [authGuard],
  },

  {
    path: 'obras/nova-obra',
    component: CadastroObraComponent,
    canActivate: [authGuard],
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];
