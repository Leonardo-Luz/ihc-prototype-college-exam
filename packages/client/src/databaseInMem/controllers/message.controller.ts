import { messageModel } from "../models";

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

class InMemoryMessage{
    itens = [] as messageModel[];

    inMemGetMessages = async ( ) =>
    {
        try
        {
            const response = this.itens;

            return {
                status: '200',
                message: 'get all Messages',
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

    inMemGetMessageById  = async ( id:number ) =>
    {

        try
        {
            const response = this.itens.find( (data) => {
                return data.messageId === id
            });

            return {
                status: '200',
                message: `get Message with id ${id}`,
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

    inMemCreateMessage  = async (data: messageModel) =>
    {
        try
        {
            const Message = {
                ...data
            } as messageModel

            qtd++;

            Message.messageId = qtd;

            // Message.createdAt = getCurrentDate();
            // Message.updatedAt = getCurrentDate();

            this.itens.push(Message);

            return {
                status: '200',
                message: 'create Message',
                body: Message
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

    inMemDeleteMessage = async ( id:number ) =>
    {
        try
        {
            const response = this.itens.find((data) => {
                return data.messageId === id;
            });

            if(response !== undefined)
            {
                this.itens.splice(this.itens.indexOf(response), 1);

                return {
                    status: '200',
                    message: `delete Message with id ${id}`,
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

    inMemUpdateMessage  = async ( data: messageModel , id: number ) =>
    {
        try
        {
            const Message = this.itens.find( (data) => {
                return data.messageId === id
            });

            if(Message !== undefined)
            {
                // Message.updatedAt = getCurrentDate();

                this.itens[this.itens.indexOf(Message)] = data;

                return {
                    status: '200',
                    message: `update Message with id ${id}`,
                    body: Message
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

export const message = new InMemoryMessage();