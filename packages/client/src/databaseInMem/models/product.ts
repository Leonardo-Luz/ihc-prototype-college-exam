export type productModel = {
    productId: number,
    name: string,
    description: string,
    stock: number | boolean,
    category: 'produto' | 'serviço' | 'saber',
    createdAt?: string,
    updatedAt?: string
}