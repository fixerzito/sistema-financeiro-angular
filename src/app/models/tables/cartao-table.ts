export interface CartaoTable {
    id: number,
    nome: string,
    digBandeira: string,
    bandeira?: string,
    diaFechamento: Date,
    diaVencimento: Date,
    saldo: number,
    contaVinculada?: string
}