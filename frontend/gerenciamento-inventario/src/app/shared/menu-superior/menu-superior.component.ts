import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar'
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-superior',
  standalone: true,
  imports: [
    ToolbarModule,
    SidebarModule,
    ButtonModule,
    CommonModule
  ],
  templateUrl: './menu-superior.component.html',
  styleUrl: './menu-superior.component.css'
})
export class MenuSuperiorComponent {

  nomePagina: string = 'Dashboard';
  sidebarVisible: boolean = true;
}
