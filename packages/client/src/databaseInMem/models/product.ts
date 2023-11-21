export type productModel = {
    productId: number,
    name: string,
    description: string,
    stock: number | boolean,
    category: 'produto' | 'serviço' | 'saber',
    userId: number,
    image?: Blob,
    situation: boolean,
    createdAt?: string,
    updatedAt?: string
}