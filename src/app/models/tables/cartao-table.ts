export interface CartaoTable {
    id: number,
    nome: string,
    digBandeira: string,
    bandeira?: string,
    diaFechamento: number,
    diaVencimento: number,
    saldo: number,
    contaVinculada?: string
}