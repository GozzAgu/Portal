export type Client = {
    id: number,
    username: string,
    email: string,
    created_at: string,
    products: number,
    services: number
}

export type Product = {
    id: number,
    name: string,
    description: string,
    created_at: string,
    img: string
}

export type Service = {
    id: number,
    name: string,
    description: string,
    created_at: string,
    img: string
}

export type LicensedProduct = {
    id: number,
    name: string,
    description: string,
    created_at: string,
    license_key: string,
    expiration_date: string
}

export type LicensedService = {
    id: number,
    name: string,
    description: string,
    created_at: string,
    license_key: string,
    expiration_date: string
}