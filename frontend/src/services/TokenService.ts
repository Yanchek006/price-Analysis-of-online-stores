import {Jwt} from "../models";

export default class TokenService {
    static saveTokensToLocalStorage(tokens: Jwt) {
        localStorage.setItem("tokens", JSON.stringify(tokens));
    }

    static saveAccessTokenToLocalStorage(access: string) {
        const tokens = this.loadTokensFromLocalStorage();
        tokens.access = access;
        this.saveTokensToLocalStorage(tokens);
    }

    static loadTokensFromLocalStorage() {
        const data  = localStorage.getItem("tokens");
        if (data) {
            return JSON.parse(data) as Jwt;
        }
        return {} as Jwt;
    }

    static cleatTokensFromLocalStorage() {
        localStorage.removeItem("tokens");
    }
}