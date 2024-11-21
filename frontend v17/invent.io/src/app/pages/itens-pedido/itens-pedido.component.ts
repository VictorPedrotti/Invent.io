import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuSuperiorComponent } from "../../shared/menu-superior/menu-superior.component";
import { MenuLateralComponent } from "../../shared/menu-lateral/menu-lateral.component";
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmationDialogComponent } from "../../shared/confirmation-dialog/confirmation-dialog.component";
import { DialogComponent } from "../../shared/dialog/dialog.component";
import { ItemPedido, Pedido, Produto } from '../../core/types/types';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TradutorService } from '../../core/services/tradutor.service';
import { ActivatedRoute } from '@angular/router';
import { ItensPedidoService } from '../../core/services/itens-pedido.service';
import { ProdutoService } from '../../core/services/produto.service';
import { FormularioItemPedidoComponent } from "../../shared/formulario-item-pedido/formulario-item-pedido.component";
import { PedidoService } from '../../core/services/pedido.service';

@Component({
  selector: 'app-itens-pedido',
  standalone: true,
  imports: [
    MenuSuperiorComponent,
    MenuLateralComponent,
    TableModule,
    ButtonModule,
    ConfirmationDialogComponent,
    DialogComponent,
    ToastModule,
    FormularioItemPedidoComponent
],
  providers: [MessageService],
  templateUrl: './itens-pedido.component.html',
  styleUrl: './itens-pedido.component.scss'
})
export class ItensPedidoComponent implements OnInit{

  filtroPesquisa: string = '';
  itensPedido: ItemPedido[] = [];
  itemPedido!: ItemPedido;
  produtos: Produto[] = [];
  itemPedidoSelecionado!: ItemPedido;
  isEditMode = false;
  dialogVisible: boolean = false;
  pedidoId!: number;
  pedidoData!: Pedido;
  private valorAntigo = { precoUnitario: 0, quantidade: 0 };

  @ViewChild(ConfirmationDialogComponent) confirmDialog!: ConfirmationDialogComponent;
  @ViewChild(FormularioItemPedidoComponent) formularioItemPedidoComponent!: FormularioItemPedidoComponent;

  constructor(
    private messageService: MessageService,
    private tradutorService: TradutorService,
    private itensPedidoService: ItensPedidoService,
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.tradutorService.setTranslation();
    this.buscaProdutos();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.pedidoId = +id;
        this.buscaItensPedido();
      }
    })
  }

  limpar(table: Table) {
    table.clear();
    this.filtroPesquisa = ''
  }

  abrirDialog() {
    this.isEditMode = false;
    if (this.formularioItemPedidoComponent) {
    this.formularioItemPedidoComponent.limpar();
  } 
  this.dialogVisible = true;
  }

  editaItemPedido(itemPedido: ItemPedido){
    this.isEditMode = true;
    this.itemPedidoSelecionado = itemPedido;
    this.valorAntigo = {
      precoUnitario: itemPedido.precoUnitario,
      quantidade: itemPedido.quantidade,
    };
    this.dialogVisible = true;
  }

  deletaItemPedido() {
    this.itensPedidoService.excluirRegistro(this.itemPedidoSelecionado.id).subscribe({
      next: res => {
        const valorTotal = Number(-(this.itemPedidoSelecionado.precoUnitario * this.itemPedidoSelecionado.quantidade))
        this.messageService.add({ severity: 'success', summary: 'Excluído', detail: 'Pedido excluído com sucesso' });
        this.buscaItensPedido(); 
        this.atualizaTotalPedido(valorTotal, Number(this.itemPedidoSelecionado.pedido_id));
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir pedido'})
      }
    })
  }

  abrirConfirmacaoExclusao (itemPedido: ItemPedido) {
    this.itemPedidoSelecionado = itemPedido;
    this.confirmDialog.message = `Tem certeza que deseja excluir o item de ID ${this.itemPedidoSelecionado.id}?`;
    this.confirmDialog.open();
  }

  buscaItensPedido(){
    this.itensPedidoService.buscarItensPorPedido(this.pedidoId).subscribe((listaItensPedido: ItemPedido[]) => {
      this.itensPedido = listaItensPedido.map(itemPedido => ({
        ...itemPedido,
        produto: this.produtos.find(p => p.id === itemPedido.produto_id)
      }));;
    })  
  }

  buscaProdutos() {
    this.produtoService.obterTodos().subscribe((listaProdutos) => {
      this.produtos = listaProdutos   
    })
  }

  salvarPedido(itemPedidoData: ItemPedido) {
    if (this.isEditMode) {
      const itemPedidoEditado = { ...itemPedidoData, id: this.itemPedidoSelecionado.id}
      this.itensPedidoService.editarRegistro(itemPedidoEditado).subscribe({
        next: res => {
          const valorAntigoTotal = this.valorAntigo.precoUnitario * this.valorAntigo.quantidade;
          const valorNovoTotal = itemPedidoEditado.precoUnitario * itemPedidoEditado.quantidade;
          const diferenca = valorNovoTotal - valorAntigoTotal;
          this.messageService.add({ severity: 'success', summary: 'Atualização', detail: 'Item atualizado com sucesso'})
          this.buscaItensPedido();
          this.atualizaTotalPedido(diferenca, Number(itemPedidoData.pedido_id));
          this.dialogVisible = false;
        },
        error: err => {
          this.messageService.add({ severity: 'error', summary: 'Erro ao atualizar item', detail: 'Erro ao atualizar item'})
        }
      })
    } else {
      this.itensPedidoService.salvarNovo(itemPedidoData).subscribe({
        next: res => {
          const valorTotal = Number(itemPedidoData.precoUnitario * itemPedidoData.quantidade)
          this.messageService.add({ severity: 'success', summary: 'Adicionar', detail: 'item adicionado com sucesso'})
          this.buscaItensPedido();
          this.atualizaTotalPedido(valorTotal, Number(itemPedidoData.pedido_id));
          this.dialogVisible = false;
        },
        error: err => {
          this.messageService.add({ severity: 'error', summary: 'Erro ao adicionar item', detail: err})  
          this.dialogVisible = false;
        }
      }) 
    }
  }

  atualizaTotalPedido(valorTotal: number, id: number) {
    this.pedidoService.buscarPorId(id).subscribe({
      next: (pedido: Pedido) => {
        const pedidoAtualizado = { ...pedido, total: pedido.total + valorTotal };
        this.pedidoService.editarRegistro(pedidoAtualizado).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Total do pedido atualizado com sucesso' });
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar total do pedido no backend' });
          }
        });
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao buscar dados do pedido' });
      }
    });
  }
}
