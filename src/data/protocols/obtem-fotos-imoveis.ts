export interface ObtemFotosImoveis {

  obterFotos(diretorio: string): Promise<string[]>

}