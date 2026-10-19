import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogComponent } from '../components/dialog/dialog';
import { DialogData } from '../models/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly dialog = inject(MatDialog);

  abrir(data: DialogData): Observable<boolean | undefined> {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '420px',
      maxWidth: '95vw',
      data,
      autoFocus: 'first-tabbable',
    });

    return dialogRef.afterClosed();
  }
}
