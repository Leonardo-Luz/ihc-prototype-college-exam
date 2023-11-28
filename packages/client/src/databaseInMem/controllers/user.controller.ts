import { userModel } from "../models";

let qtd = 1;

class InMemoryUser{
    itens = [
        {
            userId: 1,
            username: 'admin',            
            password: 'admin',
            age: 1,
            interests: 'Sistema',
            email: 'example@test.com',
            situation: true
        }
    ] as userModel[];

    inMemGetUsers = async ( ) =>
    {
        try
        {
            const response = this.itens;

            return {
                status: '200',
                message: 'get all users',
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

    inMemGetUserById  = async ( id:number ) =>
    {

        try
        {
            const response = this.itens.find( (data) => {
                return data.userId === id
            });

            return {
                status: '200',
                message: `get user with id ${id}`,
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

    inMemCreateUser  = async (data: userModel) =>
    {
        try
        {
            const User = {
                ...data
            } as userModel

            qtd++;

            User.userId = qtd;

            // User.createdAt = NOW;
            // User.updatedAt = NOW;

            this.itens.push(User);

            return {
                status: '200',
                message: 'create user',
                body: User
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

    inMemDeleteUser = async ( id:number ) =>
    {
        try
        {
            const response = this.itens.find((data) => {
                return data.userId === id;
            });

            if(response !== undefined)
            {
                this.itens.splice(this.itens.indexOf(response), 1);

                return {
                    status: '200',
                    message: `delete user with id ${id}`,
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

    inMemUpdateUser  = async ( data: userModel , id: number ) =>
    {
        try
        {
            const User = this.itens.find( (data) => {
                return data.userId === id
            });

            console.log(id);

            if(User !== undefined)
            {
                // User.updatedAt = now('postgres');

                this.itens[this.itens.indexOf(User)] = {
                    ...data,
                    userId: id,
                    situation: true
                };

                return {
                    status: '200',
                    message: `update user with id ${id}`,
                    body: User
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

export const user = new InMemoryUser();