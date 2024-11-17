import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { AutenticacaoService } from '../../core/services/authService/autenticacao.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    CommonModule,
    CardModule,
    PasswordModule,
    CheckboxModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private autenticacaoService: AutenticacaoService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required]
    })
  }

  login() {
    if(this.loginForm.valid) {
      const { email, senha } = this.loginForm.value;

      this.autenticacaoService.autenticar(email, senha).subscribe({
        next: (response) => {
          console.log('Login bem-sucedido', response)
          this.router.navigate(['/produtos']);
        },
        error: (err) => {
          console.error('Erro ao fazer login', err)
        }
      })

    }  
  }
}
