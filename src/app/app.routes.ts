import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { authGuard } from './auth/auth.guard';
import { CadastroObraComponent } from './pages/cadastro-obra/cadastro-obra';
import { ListarObrasComponent } from './pages/listar-obras/listar-obras';
import { VisualizarObraComponent } from './pages/visualizar-obra/visualizar-obra';
import { HomeComponent } from './pages/home/home';
import { EditObraComponent } from './pages/edit-obra/edit-obra';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },

  {
    path: 'dashboard',
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
    path: 'obra/visualizar/:id',
    component: VisualizarObraComponent,
    canActivate: [authGuard],
  },

  {
    path: 'obra/editar/:id',
    component: EditObraComponent,
    canActivate: [authGuard],
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];
