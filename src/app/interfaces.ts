export interface IAddForm {
    firstName: string
    lastName: string
    dob: string
    email: string
    password: string
    phoneNumber: string
    address: string
    isAdmin: boolean
}

export interface IGetAllFormUsers {
    id: number
    firstName: string
    lastName: string
    dob: string
    email: string
    password: string
    phoneNumber: string
    address: string
}

export interface IFormUser {
    id: number
    firstName: string
    lastName: string
    dob: string
    email: string
    phoneNumber: string
    address: string
}

export interface IGetAllUsers {
    id: string
    email: string
    isAdmin: boolean
}

export interface IAddUser {
    id: number
    email: string
    password: string
    isAdmin: boolean
}
export interface ILogin {
    email: string
    password: string
}
export interface IToken {
    token: string
}

export interface IResetPassword {
    email: string
    newPassword: string
}

export interface IEditUser {
    id: number
    email: string
    isAdmin: boolean
}

export interface IDelete {
    id: number
}