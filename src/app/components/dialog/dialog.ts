import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../models/dialog';

@Component({
  selector: 'app-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
})
export class DialogComponent {
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  private readonly dialogRef = inject(MatDialogRef<DialogComponent, boolean>);

  confirmar(): void {
    this.dialogRef.close(true);
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}
