export interface UsuarioLoginResponse {
    sucesso: boolean,
    accessToken: string,
    refreshToken: string,
    erros: string[]
}