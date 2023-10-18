import {IAccess, IRegisterUser, IUser} from "../models";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService.ts";
import axios, {AxiosError} from "axios";
import {API_URL} from "../http";
import TokenService from "../services/TokenService.ts";


interface Errors {
    login: any[],
    register: any[],
}

export function parse_errors(data: Object): any[] {
    const errors = [];
    for (const [key, value] of Object.entries(data)) {
        if (value.constructor === Array || typeof value === "string") {
            errors.push(`${key}: ${value}`)
        } else {
            errors.push(...parse_errors(value));
        }
    }
    return errors;
}


export default class Store {
    errors: Errors = {
        login: [],
        register: [],
    };

    isAuth = false;

    isLoading: boolean = false;
    isLoading1: boolean = true;
    isLoading2: boolean = true;

    constructor() {
        makeAutoObservable(this);
    }

    setErrors(errors: Errors) {
        this.errors = errors;
    }

    clearErrors() {
        this.errors = {
            login: [],
            register: [],
        };
    }


    setAuth(isAuth: boolean) {
        this.isAuth = isAuth;
    }

    setIsLoading(isLoading: boolean): void {
        this.isLoading = isLoading;
    }


    setIsLoading1(isLoading: boolean): void {
        this.isLoading1 = isLoading;
    }

    setIsLoading2(isLoading: boolean): void {
        this.isLoading2 = isLoading;
    }

    logout() {
        TokenService.cleatTokensFromLocalStorage();
        this.setAuth(false);
    }

    async login(user: IUser) {
        try {
            this.setIsLoading(true);
            this.clearErrors();
            const response = await AuthService.login(user);
            TokenService.saveTokensToLocalStorage(response.data)
            this.setAuth(true);
        } catch (exception) {
            this.setErrors({
                login: parse_errors((exception as AxiosError).response?.data as object),
                register: [],
            });
            throw exception;
        } finally {
            this.setIsLoading(false);
        }
    }

    async register(user: IRegisterUser) {
        try {
            this.setIsLoading(true);
            this.clearErrors();
            await AuthService.register(user);
            await this.login({username: user.username, password: user.password});
        } catch (exception) {
            this.setErrors({
                register: parse_errors((exception as AxiosError).response?.data as object),
                login: [],
            });
            throw exception;
        } finally {
            this.setIsLoading(false);
        }
    }



    async checkAuth() {
        try {
            this.setIsLoading(true);
            const response = await axios.post<IAccess>(
                `${API_URL}/token/refresh/`,
                {
                    refresh: TokenService.loadTokensFromLocalStorage().refresh,
                },
                {
                    withCredentials: true,
                }
            );
            TokenService.saveAccessTokenToLocalStorage(response.data.access);
            this.setAuth(true);
        } catch (exception) {
            console.log(exception)
        } finally {
            this.setIsLoading(false);
        }
    }
}