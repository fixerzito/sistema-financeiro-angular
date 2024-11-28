export interface TransacaoFormUpdate {
    id?: number,
    status?: boolean,
    dataPrevista?: Date | null,
    dataEfetivacao?: Date | null,
    idContaBancaria?: number,
    idSubcategoriaTransacao?: number,
    idCategoriaTransacao?: number,
    tipoTransacao?: number,
    valor?: number,
    valorDiferenca?: number,
    nome: string,    
}