export interface IAddUser {
    firstName: string
    lastName: string
    birthday: string
    email: string
    password: string
    phoneNumber: string
    address: string
    isAdmin: boolean
}

export interface IGetAllUsers {
    id: number
    firstName: string
    lastName: string
    birthday: string
    email: string
    password: string
    phoneNumber: string
    address: string
    isAdmin: boolean
}

export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    address: string;
    phone: string;
}