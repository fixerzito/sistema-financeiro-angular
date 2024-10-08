export interface ContaBancariaFormUpdate {
    id: number,
    nome: string,
    saldo?: number | null,
    icon: string,
    idCategoria: number
  };