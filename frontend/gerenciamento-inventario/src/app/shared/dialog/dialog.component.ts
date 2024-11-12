import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    ButtonModule
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange  = new EventEmitter<boolean>();
  @Input() tituloFormulario: string = 'Produto';
  
  fecharDialog() {
    this.visible = false;
    this.visibleChange .emit(this.visible);
  }
}
