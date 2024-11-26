import { Component, OnInit } from '@angular/core';
import { MenuSuperiorComponent } from "../../shared/menu-superior/menu-superior.component";
import { MenuLateralComponent } from "../../shared/menu-lateral/menu-lateral.component";
import { ChartModule } from 'primeng/chart';
import { ProdutoService } from '../../core/services/produto.service';
import { Produto, Transacao } from '../../core/types/types';
import { TransacaoService } from '../../core/services/transacao.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MenuSuperiorComponent, 
    MenuLateralComponent,
    ChartModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  basicData: any;
  basicOptions: any;
  transacaoData: any;
  transacaoOptions: any;

  constructor(
    private produtoService: ProdutoService,
    private transacaoService: TransacaoService
  ) {}

  ngOnInit() {
    this.carregarDadosGrafico();
    this.carregarDadosGraficoTransacoes();
  }

  carregarDadosGrafico() {
    this.produtoService.obterTodos().subscribe({
      next: (produtos: Produto[]) => {
        const nomesProdutos = produtos.map(produto => produto.nome);
        const quantidadesProdutos = produtos.map(produto => produto.quantidade);
  
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
  
        this.basicData = {
          labels: nomesProdutos, 
          datasets: [
            {
              label: 'Quantidade Disponível',
              data: quantidadesProdutos, 
              backgroundColor: nomesProdutos.map(() => 'rgba(75, 192, 192, 0.2)'), 
              borderColor: nomesProdutos.map(() => 'rgba(75, 192, 192, 1)'), 
              borderWidth: 1
            }
          ]
        };
  
        this.basicOptions = {
          plugins: {
            legend: {
              labels: {
                color: textColor
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: textColorSecondary
              },
              grid: {
                color: surfaceBorder,
                drawBorder: false
              }
            },
            x: {
              ticks: {
                color: textColorSecondary
              },
              grid: {
                color: surfaceBorder,
                drawBorder: false
              }
            }
          }
        };
      },
      error: (err) => {
        console.error('Erro ao carregar os dados do gráfico:', err);
      }
    });
  }

  carregarDadosGraficoTransacoes() {
    this.transacaoService.obterTodos().subscribe({
      next: (transacoes: Transacao[]) => {
        const hoje = new Date();
        const trintaDiasAtras = new Date();
        trintaDiasAtras.setDate(hoje.getDate() - 30);

        const transacoesFiltradas = transacoes.filter((transacao) => {
          const dataTransacao = new Date(transacao.data);
          return (
            dataTransacao >= trintaDiasAtras &&
            dataTransacao <= hoje
          );
        });

        const totalEntrada = transacoesFiltradas
          .filter((t) => t.tipo.toLowerCase() === 'entrada')
          .reduce((acc, t) => acc + t.valor, 0);

        const totalSaida = transacoesFiltradas
          .filter((t) => t.tipo.toLowerCase() === 'saída')
          .reduce((acc, t) => acc + t.valor, 0);

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');

        this.transacaoData = {
          labels: ['Entrada', 'Saída'],
          datasets: [
            {
              label: 'Totais (30 dias)',
              data: [totalEntrada, totalSaida],
              backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
              borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
              borderWidth: 1,
            },
          ],
        };

        this.transacaoOptions = {
          plugins: {
            legend: {
              labels: {
                color: textColor,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: textColorSecondary,
              },
            },
            x: {
              ticks: {
                color: textColorSecondary,
              },
            },
          },
        };
      },
      error: (err) => {
        console.error('Erro ao carregar transações:', err);
      },
    });
  }
}  