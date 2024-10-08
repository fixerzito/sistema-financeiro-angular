export interface CartaoCreditoFormUpdate {
    id?: number,
    nome?: string,
    digBandeira: string,
    saldo?: number,
    limite?: number,
    diaFechamento?: number,
    diaVencimento?: number,
    idContaVinculada?: number
}