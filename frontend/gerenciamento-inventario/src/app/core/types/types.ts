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
  
}