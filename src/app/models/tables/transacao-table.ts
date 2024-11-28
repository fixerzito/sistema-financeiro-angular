export interface TransacaoTable{
    id: number,
    nome: string,
    status: boolean,
    dataPrevista: Date,
    dataEfetivacao: Date,
    tipoTransacao: string,
    contaBancaria: string,
    categoriaTransacao?: string,
    subcategoriaTransacao?: string,
    valor?: number,
}