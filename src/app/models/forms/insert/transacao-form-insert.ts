export interface TransacaoFormInsert {
    status?: boolean,
    dataPrevista?: Date | null,
    dataEfetivacao?: Date | null,
    idSubcategoriaTransacao?: number,
    idContaBancaria?: number,
    tipoTransacao?: number,
    valor?: number,
    nome: string,    
}