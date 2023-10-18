import $api, {API_URL} from "../http";
import axios, {AxiosResponse} from "axios";
import {AuthResponse,  UserRegisterResponse} from "../models/response/AuthResponse.ts";
import {IRegisterUser, IUser} from "../models";

export default class AuthService {
    static async login(user: IUser): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/token/", user);
    }

    static async register(user: IRegisterUser): Promise<AxiosResponse<UserRegisterResponse>> {
        return axios.post(`${API_URL}/register/`, user, {withCredentials: true});
    }
}