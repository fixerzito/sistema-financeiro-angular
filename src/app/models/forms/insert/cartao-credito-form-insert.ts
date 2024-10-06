export interface CartaoCreditoFormInsert {
    nome?: string,
    digBandeira: string,
    saldo?: number,
    limite?: number,
    diaFechamento?: string,
    diaVencimento?: string,
    idContaVinculada?: number
}