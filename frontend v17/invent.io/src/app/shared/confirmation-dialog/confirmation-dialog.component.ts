import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {
  @Input() message: string = 'Tem certeza que deseja continuar?';
  @Input() header: string = 'Confirmação';
  @Input() icon: string = 'pi pi-exclamation-triangle';
  @Input() acceptLabel: string = 'Sim';
  @Input() rejectLabel: string = 'Não';
  
  @Output() onConfirm = new EventEmitter<void>();

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  
  open() {
    this.confirmationService.confirm({
      message: this.message,
      header: this.header,
      icon: this.icon,
      acceptLabel: this.acceptLabel,
      rejectLabel: this.rejectLabel,
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.onConfirm.emit();
      }
    });
  }
}
