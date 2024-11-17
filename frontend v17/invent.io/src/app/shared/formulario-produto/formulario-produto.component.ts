import { FormsModule, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { Fornecedor, Produto } from '../../core/types/types';
import { FornecedorService } from '../../core/services/fornecedor.service';
import { InputTextareaModule } from 'primeng/inputtextarea';

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
    FileUploadModule,
    InputTextareaModule
  ],
  templateUrl: './formulario-produto.component.html',
  styleUrl: './formulario-produto.component.scss'
})
export class FormularioProdutoComponent implements OnInit {
  @Input() produto!: Produto;
  @Input() isEditMode = false;
  produtoForm!: FormGroup;
  fornecedores: Fornecedor[] = []
  @Output() salvar = new EventEmitter<Produto>();
  @ViewChild('fileUpload') fileUpload!: FileUpload;

  constructor(
    private formBuilder: FormBuilder,
    private fornecedorService: FornecedorService
  ) { }

  ngOnInit(): void {
    this.buscaFornecedores();
    this.produtoForm = this.formBuilder.group({
      nome: [null, Validators.required],
      imagem: [null],
      descricao: [null],
      preco: [0, Validators.required],
      quantidade: [0, Validators.required],
      fornecedor_id: [0, Validators.required]
    })
  }

  converteImagem(event: any) {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const base64WebP = canvas.toDataURL('image/webp', 0.8);
            console.log(base64WebP);
            this.produtoForm.patchValue({
              imagem: base64WebP
            });
          }
        };
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['produto'] && this.produto) {
      this.produtoForm.patchValue({
        ...this.produto,
        fornecedor_id: this.produto.fornecedor_id
      });
      this.limparUploadImagem();
    }
  }

  salvarForm() {
    if (this.produtoForm.valid) {
      this.salvar.emit(this.produtoForm.value);
    }
  }

  limparUploadImagem() {
    if (this.fileUpload) {
      this.fileUpload.clear();
    }
  }

  buscaFornecedores() {
    this.fornecedorService.obterTodos().subscribe((listaFornecedores) => {
      this.fornecedores = listaFornecedores;
    })
  }

  limpar() {
    this.produtoForm.reset();
  }
}
