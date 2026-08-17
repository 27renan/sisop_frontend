import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, MatListModule, MatIconModule, MatDividerModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class NavComponent {
  menus = [
    {
      titulo: 'Dashboard',
      icone: 'dashboard',
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
}
