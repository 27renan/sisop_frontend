export type DialogType = 'confirm' | 'success' | 'error' | 'warning' | 'info';

export interface DialogData {
  title: string;
  message?: string;
  type?: 'confirm' | 'alert';
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;

  // Novas propriedades para formatação
  messageBefore?: string;
  highlightText?: string;
  messageAfter?: string;
}
