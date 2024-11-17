export interface TransacaoFormUpdate {
    id?: number,
    idContaBancaria?: number,
    idSubcategoriaTransacao?: number,
    idCategoriaTransacao?: number,
    tipoTransacao?: number,
    valor?: number,
    valorDiferenca?: number,
    nome: string,    
}