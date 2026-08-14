import { ChangeDetectorRef, Component, Input, OnInit, signal } from '@angular/core';

import { HeaderComponent } from '../../components/header/header';
import { DetailsService } from '../../service/details.service';
import { NavComponent } from '../../components/nav/nav';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, NavComponent, MatSidenavModule, MatButtonModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  nomeUsuario: string = '';
  omUsuario: string = '';
  showFiller = signal(false);

  constructor(
    private detailsService: DetailsService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.detailsUser();
  }

  detailsUser() {
    this.detailsService.detailsUser().subscribe({
      next: (usuario) => {
        console.log(usuario);
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
}
