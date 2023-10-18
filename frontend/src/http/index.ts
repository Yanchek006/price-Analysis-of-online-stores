import axios from "axios";
import TokenService from "../services/TokenService.ts";
import {IAccess} from "../models";
import {AxiosError} from "axios";

export const BACKEND_ADDRESS = "localhost"
export const API_URL = `http://${BACKEND_ADDRESS}/api`;

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${TokenService.loadTokensFromLocalStorage().access}`
    return config;
});

$api.interceptors.response.use((config) => {
        return config;
    }, (async error => {
        const originRequest = error.config;
        const tokens = TokenService.loadTokensFromLocalStorage();

        if (
            error.response.status === 401 &&
            originRequest &&
            !originRequest.isRetry &&
            tokens &&
            tokens.refresh
        ) {
            originRequest.isRetry = true;

            try {
                const response = await axios.post<IAccess>(
                    `${API_URL}/token/refresh/`,
                    {
                        refresh: tokens.refresh,
                    },
                    {
                        withCredentials: true,
                    }
                );
                TokenService.saveAccessTokenToLocalStorage(response.data.access);
                return $api.request(originRequest);
            } catch (exception) {
                console.log((exception as AxiosError).message);
                console.log((exception as AxiosError).response?.data);
            }
        }
        throw error;
    })
)

export default $api;