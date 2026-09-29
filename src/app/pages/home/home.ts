import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';
import { NavComponent } from '../../components/nav/nav';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    NavComponent,
    MatSidenavModule,
    FooterComponent,
    MatButtonModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {}
