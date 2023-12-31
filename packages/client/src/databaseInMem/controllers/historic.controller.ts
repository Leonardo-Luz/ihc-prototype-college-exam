import { historicModel } from "../models";

let qtd = 0;

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

class InMemoryHistoric{
    itens = [] as historicModel[];

    inMemGetHistorics = async ( ) =>
    {
        try
        {
            const response = this.itens;

            return {
                status: '200',
                message: 'get all historic',
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

    inMemGetHistoricById  = async ( id:number ) =>
    {

        try
        {
            const response = this.itens.find( (data) => {
                return data.historicId === id
            });

            return {
                status: '200',
                message: `get historic with id ${id}`,
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

    inMemCreateHistoric  = async (data: historicModel) =>
    {
        try
        {
            const Historic = {
                ...data,
            } as historicModel

            qtd++;

            Historic.historicId = qtd;

            Historic.data = getCurrentDate();

            this.itens.push(Historic);

            return {
                status: '200',
                message: 'create historic',
                body: Historic
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

    inMemDeleteHistoric = async ( id:number ) =>
    {
        try
        {
            const response = this.itens.find((data) => {
                return data.historicId === id;
            });

            if(response !== undefined)
            {
                this.itens.splice(this.itens.indexOf(response), 1);

                return {
                    status: '200',
                    message: `delete historic with id ${id}`,
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

    inMemUpdateHistoric  = async ( data: historicModel , id: number ) =>
    {
        try
        {
            const Historic = this.itens.find( (data) => {
                return data.historicId === id
            });

            if(Historic !== undefined)
            {
                // Historic.data = now('postgres');
                this.itens[this.itens.indexOf(Historic)] = data;

                return {
                    status: '200',
                    message: `update historic with id ${id}`,
                    body: Historic
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

export const historic = new InMemoryHistoric();
