import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar'
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MenuSuperiorComponent } from "../../shared/menu-superior/menu-superior.component";
import { MenuLateralComponent } from "../../shared/menu-lateral/menu-lateral.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ToolbarModule,
    SidebarModule,
    ButtonModule,
    CommonModule,
    MenuSuperiorComponent,
    MenuLateralComponent
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  
}
