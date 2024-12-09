export interface TransacaoFormInsert {
    id?: number,
    nome?: string,    
    valor?: number,
    status?: boolean,
    tipoTransacao?: number,
    dataPrevista?: Date | null,
    dataEfetivacao?: Date | null,
    idSubcategoriaTransacao?: number,
    idContaBancaria?: number,
}