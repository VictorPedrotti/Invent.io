export interface ItemMenu {
  texto: string
  icone: string
  rota: string | string[]
}

export interface Produto {
  id: number
  nome: string
  descricao: string
  preco: number
  quantidade: number
  imagem: string 
  fornecedor_id: number
}

export interface Cliente {
  id: number
  nome: string
  cpf_cnpj: string
  contato: string
  endereco: string
}

export interface Pedido {
  id: number
  status: string
  data: Date
  total: number
  cliente_id: number  
}

export interface Fornecedor {
  id: number
  nome: string
  cnpj: string
  contato: string
  endereco: string
}

export interface ItemPedido {
  id: number
  pedido_id: number
  produto_id: number
  quantidade: number
  precoUnitario: number  
}

export interface Transacao {
  id: number
  data: Date
  tipo: string
  valor: number
  produto_id: number
  pedido_id: number
}