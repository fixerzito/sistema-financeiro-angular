import { Bandeira } from '../models/tables/bandeira.component';

export function obterStringBandeiraCartao(digitos: string): string {
    let bandeiraCartao: string;

    if (/^4/.test(digitos)) {
        bandeiraCartao = "Visa";
    } else if (/^51|52|53|54|55/.test(digitos)) {
        bandeiraCartao = "MasterCard";
    } else if (/^34|37/.test(digitos)) {
        bandeiraCartao = "American Express";
    } else if (/^6011|622|64|65/.test(digitos)) {
        bandeiraCartao = "Discover";
    } else if (/^35/.test(digitos)) {
        bandeiraCartao = "JCB";
    } else if (/^60/.test(digitos)) {
        bandeiraCartao = "Diners Club";
    } else {
        bandeiraCartao = "Bandeira desconhecida";
    }

    return bandeiraCartao;
}

export function obterBandeiraCartao(digitos: string, bandeira: Bandeira) {
    if (/^4/.test(digitos)) {
        bandeira.nome = "Visa";
        bandeira.link = 'assets/flags-icon/visa.png';
    } else if (/^51|52|53|54|55/.test(digitos)) {
        bandeira.nome = "MasterCard";
        bandeira.link = 'assets/flags-icon/mastercard.png';
    } else if (/^34|37/.test(digitos)) {
        bandeira.nome = "American Express";
        bandeira.link = 'assets/flags-icon/american.png';
    } else if (/^6011|622|64|65/.test(digitos)) {
        bandeira.nome = "Discover";
        bandeira.link = 'assets/flags-icon/discover.png';
    } else if (/^35/.test(digitos)) {
        bandeira.nome = "JCB";
        bandeira.link = 'assets/flags-icon/jcb.png';
    } else if (/^60/.test(digitos)) {
        bandeira.nome = "Diners Club";
        bandeira.link = 'assets/flags-icon/diners.png';
    } else {
        bandeira.nome = "";
        bandeira.link = '';
    }
}