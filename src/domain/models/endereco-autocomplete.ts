export interface EnderecoAutocomplete {

  descricao: string
  endereco: Endereco
  escopoBusca: string
}

type Endereco = {
  logradouro?: string,
  bairro?: string,
  cidade?: string,
  estado?: string,
  pais: string
}