export interface CartaoCreditoFormInsert {
    nome?: string,
    digBandeira: string,
    saldo?: number,
    limite?: number,
    diaFechamento?: number,
    diaVencimento?: number,
    idContaVinculada?: number
}