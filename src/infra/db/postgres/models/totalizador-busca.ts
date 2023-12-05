export class TotalizadorPesquisa {

  resultado: Array<ContadorTipoImovel>
  total_geral: number

}

export type ContadorTipoImovel = {

  numero_registros: number,
  tipo: string

}