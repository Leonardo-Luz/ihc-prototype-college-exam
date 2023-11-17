import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput, FormButton } from "../components/form/FormElements";
import "../styles/form.style.css"

import { userModel } from "../databaseInMem/models";
import { user } from "../databaseInMem/controllers/user.controller";

import auth from "../services/auth.service";

const UserRegister = () => {

    const navigate = useNavigate();

    const [ userTemp , setUserTemp ] = useState<userModel | null>(null);

    const changeHandle = ( e: any ) =>
    {
        const parameter = e.currentTarget.id as 
            'username' |
            'email' |
            'age' |
            'password' |
            'interests'

        const newUser = { ...userTemp } as userModel;

        if(parameter === 'username')
            newUser[parameter] = e.currentTarget.value;
        else if(parameter === 'email')
            newUser[parameter] = e.currentTarget.value;
        else if(parameter === 'password')
            newUser[parameter] = e.currentTarget.value;
        else if(parameter === 'age')
            newUser[parameter] = e.currentTarget.value;
        else if(parameter === 'interests')
            newUser[parameter] = e.currentTarget.value;


        setUserTemp(newUser);
    }

    const submitHandle = async ( e: React.MouseEvent ) =>
    {   
        const userRegister = userTemp;

        e.preventDefault();

        if(userRegister)
        {
            await user.inMemCreateUser({...userRegister});
                            
            await auth.login(userRegister);

            navigate('/');
        }
    }


    return (
        <div className="body">
            <div className="form">
                <h1>Cadastrar Usuário</h1>
                <div className="form-list">
                    <FormInput id="username" changeHandler={changeHandle} type="text">Nome: </FormInput>
                    <FormInput id="password" changeHandler={changeHandle} type="password">Senha: </FormInput>
                    <FormInput id="age" changeHandler={changeHandle} type="number">Idade: </FormInput>
                    <FormInput id="email" changeHandler={changeHandle} type="text">Email: </FormInput>
                    <FormInput id="interests" changeHandler={changeHandle} type="text">Interesses: </FormInput>
                </div>
                <FormButton clickHandler={submitHandle}>Enviar</FormButton>
            </div>
        </div>
    )
}

export default UserRegister;