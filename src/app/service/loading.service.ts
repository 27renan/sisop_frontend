import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly tempoMinimo = 800;

  constructor(private spinner: NgxSpinnerService) {}

  show(): number {
    this.spinner.show();
    return Date.now();
  }

  hide(inicio: number): void {
    const tempoDecorrido = Date.now() - inicio;
    const tempoRestante = Math.max(this.tempoMinimo - tempoDecorrido, 0);

    setTimeout(() => {
      this.spinner.hide();
    }, tempoRestante);
  }
}
