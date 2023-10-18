export interface IUser {
    username: string,
    password: string,
}

export interface IAccess {
    access: string,
}

export interface Jwt extends IAccess{
    refresh: string,
}

export interface IRegisterUser extends IUser{
    first_name: string,
    last_name: string,
    email: string,
}
