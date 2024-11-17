export interface TransacaoTable{
    id: number,
    nome: string,
    tipoTransacao: string,
    contaBancaria: string,
    categoriaTransacao?: string,
    subcategoriaTransacao?: string,
    valor?: number,
}