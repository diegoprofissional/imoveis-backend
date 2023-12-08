export interface EnumeraDiretorioFotos {

  obterProximoDiretorio(): Promise<{ proximoSubdiretorio: number, novoSubdiretorioFotos: string }>

}