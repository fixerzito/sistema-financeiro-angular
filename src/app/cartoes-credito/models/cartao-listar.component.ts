export interface CartaoListar {
    id: number,
    nome: string,
    digBandeira: string,
    diaFechamento: Date,
    diaVencimento: Date,
    saldo: number,
    contaVinculada?: string
}