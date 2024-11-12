import { FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-formulario-produto',
  standalone: true,
  imports: [
    FloatLabelModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    FileUploadModule
  ],
  templateUrl: './formulario-produto.component.html',
  styleUrl: './formulario-produto.component.css'
})
export class FormularioProdutoComponent implements OnInit {

  produtoForm!: FormGroup;
  fornecedores: string[] = ['Teste1', 'Teste2']

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.produtoForm = this.formBuilder.group({
      nome: [null, Validators.required],
      imagem: [null],
      descricao: [null],
      preco: [0, Validators.required],
      quantidade: [0, Validators.required],
      fornecedor: [0, Validators.required]
    })
  }

  converteImagem(event: any){}

}
