import { propositionModel } from "../models";

let qtd = 0;

class InMemoryProposition{
    itens = [] as propositionModel[];

    inMemGetPropositions = async ( ) =>
    {
        try
        {
            const response = this.itens;

            return {
                status: '200',
                message: 'get all Propositions',
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

    inMemGetPropositionById  = async ( id:number ) =>
    {

        try
        {
            const response = this.itens.find( (data) => {
                return data.propositionId === id
            });

            return {
                status: '200',
                message: `get Proposition with id ${id}`,
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

    inMemCreateProposition  = async (data: propositionModel) =>
    {
        try
        {
            const Proposition = {
                ...data
            } as propositionModel

            qtd++;

            Proposition.propositionId = qtd;

            // Proposition.createdAt = getCurrentDate();
            // Proposition.updatedAt = getCurrentDate();

            this.itens.push(Proposition);

            return {
                status: '200',
                message: 'create Proposition',
                body: Proposition
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

    inMemDeleteProposition = async ( id:number ) =>
    {
        try
        {
            const response = this.itens.find((data) => {
                return data.propositionId === id;
            });

            if(response !== undefined)
            {
                this.itens.splice(this.itens.indexOf(response), 1);

                return {
                    status: '200',
                    message: `delete Proposition with id ${id}`,
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

    inMemUpdateProposition  = async ( data: propositionModel , id: number ) =>
    {
        try
        {
            const Proposition = this.itens.find( (data) => {
                return data.propositionId === id
            });

            if(Proposition !== undefined)
            {
                // Proposition.updatedAt = getCurrentDate();

                this.itens[this.itens.indexOf(Proposition)] = data;

                return {
                    status: '200',
                    message: `update Proposition with id ${id}`,
                    body: Proposition
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

export const proposition = new InMemoryProposition();