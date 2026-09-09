import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { DetailsService } from '../../service/details.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
    MatSidenavModule,

    MatListModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent implements OnInit {
  // @Input() nomeUsuario: string = '';
  // @Input() omUsuario: string = '';

  nomeUsuario: string = '';
  omUsuario: string = '';

  menus = [
    {
      titulo: 'Início',
      icone: 'home',
      rota: '/home',
    },
    {
      titulo: 'Obras',
      icone: 'construction',
      rota: '/obras',
    },
    {
      titulo: 'Patrimônio',
      icone: 'inventory_2',
      rota: '/patrimonio',
    },
    {
      titulo: 'Imóveis',
      icone: 'apartment',
      rota: '/imoveis',
    },
    {
      titulo: 'Gestão Ambiental',
      icone: 'eco',
      rota: '/ambiental',
    },
    {
      titulo: 'Relatórios',
      icone: 'assessment',
      rota: '/relatorios',
    },
    {
      titulo: 'Usuários',
      icone: 'group',
      rota: '/usuarios',
    },
  ];

  constructor(
    private service: AuthService,
    private router: Router,
    private toast: ToastrService,
    private detailsService: DetailsService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.detailsUser();
  }

  /***************************Detalhes do usuario***********************************/
  detailsUser() {
    this.detailsService.detailsUser().subscribe({
      next: (usuario) => {
        //localStorage.setItem('usuarioNome', usuario.nome);
        //localStorage.setItem('usuarioOM', usuario.unidade.sigla);
        this.nomeUsuario = usuario.nome;
        this.omUsuario = usuario.unidade.sigla;
        localStorage.setItem('role', usuario.role);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching user details:', error);
      },
    });
  }

  logout() {
    this.router.navigate(['login']);
    this.service.logout();
    this.toast.info('Logout realizado com sucesso', 'Logout');
  }
}
