import { productModel } from "../models";

export class InMemoryProduct{
    itens = [] as productModel[];

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

            Product.createdAt = Date.now();
            Product.updatedAt = Date.now();

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
                Product.updatedAt = Date.now();

                this.itens[this.itens.indexOf(Product)] = data;

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
