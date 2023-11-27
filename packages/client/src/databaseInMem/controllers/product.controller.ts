import { productModel } from "../models";

let qtd = 3;

const getCurrentDate = () => {

    const newDate = new Date()
    const date = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const hours = newDate.getHours();
    const min = newDate.getMinutes();
    const seconds = newDate.getSeconds();
    
    
    return `${date}/${month<10?`0${month}`:`${month}`}/${year} ${hours}:${min}:${seconds} `
}

class InMemoryProduct{
    itens = [
        {
            productId: 1,
            description: 'Redonda',
            name: 'Bola de vôlei',
            category: "produto",
            stock: 12,
            situation: true,
            userId: 1
        },
        {
            productId: 2,
            description: 'Redonda',
            name: 'Bola de football',
            category: "produto",
            stock: 2,
            situation: true,
            userId: 1
        },
        {
            productId: 3,
            description: '1 hora cortando sua grama',
            name: 'Cortar grama',
            category: "serviço",
            stock: 3,
            situation: true,
            userId: 1
        }                
    ] as productModel[];

    inMemGetProducts = async ( ) =>
    {
        try
        {
            const response = this.itens;

            return {
                status: '200',
                message: 'get all products',
                response: response
            }
        }
        catch (e)
        {
            return {
                status: '500',
                message: 'server error',
                error: e
            }
        }
    }

    inMemGetProductById  = async ( id:number ) =>
    {

        try
        {
            const response = this.itens.find( (data) => {
                return data.productId === id
            });

            return {
                status: '200',
                message: `get product with id ${id}`,
                response: response
            }
        }
        catch (e)
        {
            return {
                status: '500',
                message: 'server error',
                error: e
            }
        }
    }

    inMemCreateProduct  = async (data: productModel) =>
    {
        try
        {
            const Product = {
                ...data
            } as productModel

            qtd++;

            Product.productId = qtd;

            Product.createdAt = getCurrentDate();
            Product.updatedAt = getCurrentDate();

            this.itens.push(Product);

            return {
                status: '200',
                message: 'create Product',
                body: Product
            }
        } 
        catch (e)
        {
            return {
                status: '500',
                message: 'server error',
                error: e
            }
        }
    }

    inMemDeleteProduct = async ( id:number ) =>
    {
        try
        {
            const response = this.itens.find((data) => {
                return data.productId === id;
            });

            if(response !== undefined)
            {
                this.itens.splice(this.itens.indexOf(response), 1);

                return {
                    status: '200',
                    message: `delete product with id ${id}`,
                    response: response
                }
            }
            else
                return {
                    status: '404',
                    message: 'not found'
                }
    }
        catch (e)
        {
            return {
                status: '500',
                message: 'server error',
                error: e
            }
        }
    }

    inMemUpdateProduct  = async ( data: productModel , id: number ) =>
    {
        try
        {
            const Product = this.itens.find( (data) => {
                return data.productId === id
            });

            if(Product !== undefined)
            {
                
                this.itens[this.itens.indexOf(Product)] = {
                    ...data,
                    productId: id,
                    userId: this.itens[this.itens.indexOf(Product)].userId,
                    situation: true
                };
                
                Product.updatedAt = getCurrentDate();

                return {
                    status: '200',
                    message: `update product with id ${id}`,
                    body: Product
                }
            }
            else
                return {
                    status: '404',
                    message: 'not found'
                }
        }
        catch (e)
        {
            return {
                status: '500',
                message: 'server error',
                error: e
            }
        }
    }
}

export const product = new InMemoryProduct();