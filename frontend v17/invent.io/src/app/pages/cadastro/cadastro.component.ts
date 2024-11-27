import { ButtonModule } from 'primeng/button';
import { AutenticacaoService } from '../../core/services/authService/autenticacao.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormValidations } from '../../shared/form-validations';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    CardModule,
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {

  cadastroForm!: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private authService: AutenticacaoService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required]],
      confirmaSenha: [null, [Validators.required, FormValidations.equalTo('senha')]],
      nome: [null, Validators.required]
    })
  }

  cadastraUsuario() {
    this.submitted = true;
    
    if (this.cadastroForm.valid) {
      const { nome, email, senha } = this.cadastroForm.value;
      console.log(nome, email, senha)
      this.authService.cadastrarUsuario(nome, email, senha, false).subscribe({
        next: () => {
          this.router.navigate(['/produtos']);
        },
        error: (err) => {
          this.messageService.add({ severity: 'warn', summary: 'Erro no cadastro', detail: err.error.mensagem });
        }
      })
    }
  }
}
