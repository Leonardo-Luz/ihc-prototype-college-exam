import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormInput, FormButton } from "../components/form/FormElements";
import "../styles/form.style.css"

import { userModel } from "../databaseInMem/models";

import auth from "../services/auth.service";
import { user } from "../databaseInMem/controllers/user.controller";

const UserLogin = () => {

    const navigate = useNavigate();

    const [ userTemp , setUserTemp ] = useState<userModel | null>(null);

    const [ validationError , setValidationError] = useState({
        username: 'Usuário não pode estar vazio',
        password: 'Senha não pode estar vazio',
    }) 


    const changeHandle = ( e: any ) =>
    {
        const parameter = e.currentTarget.id as 
            'username' |
            'password'

        const newUser = { ...userTemp } as userModel;
        const newErrors = { ...validationError };

        if(e.currentTarget.value === '' && (parameter === 'username' || parameter === 'password'))
            newErrors[parameter] = `${parameter} não pode estar vazio`;  
        else if(parameter === 'username' && user.itens.find((data) => {
            return data.username === e.currentTarget.value
        }) === undefined)
        {
            newErrors[parameter] = `${parameter} não cadastrado`;
        }
        else if(parameter === 'password' && user.itens.find((data) => {
            return data.username === userTemp?.username &&
                data.password === e.currentTarget.value
        }) === undefined)
        {
            newErrors[parameter] = `${parameter} incorreta`;
        }
        else if (parameter === 'username' || parameter === 'password')
        {
            newErrors[parameter] = '';
        }

        if(parameter === 'username')
            newUser[parameter] = e.currentTarget.value;
        else if(parameter === 'password')
            newUser[parameter] = e.currentTarget.value;

        setUserTemp(newUser);
        setValidationError(newErrors);
    }

    const submitHandle = async () =>
    {   
        if(
            validationError.password !== '' ||
            validationError.username !== ''
        )
        {
            alert(`${
                (validationError.password !== '' && validationError.password + '\n') || 
                (validationError.password === '' && '')
            }${
                (validationError.username !== '' && validationError.username + '\n') || 
                (validationError.username === '' && '')
            }
            `);

            return;
        }
        
        const userRegister = userTemp;

        if(userRegister)
        {                            
            const response = await auth.login(userRegister);

            console.log(response);
            console.log(userRegister);
            

            if(response === 200)
                navigate('/');
            else
            {
                console.log('Error');
            }
        }
    }


    return (
        <div className="body">
            <label className="form" onKeyDown={(e) => {
                if(e.key === 'Enter')
                {
                    submitHandle()
                }
            }}>
                <h1>Login</h1>
                <div className="form-list">
                    <FormInput id="username" changeHandler={changeHandle} type="text">Nome: </FormInput>
                    <FormInput id="password" changeHandler={changeHandle} type="password">Senha: </FormInput>
                </div>
                <FormButton clickHandler={submitHandle}>Enviar</FormButton>

                <Link to={'/register/user'}>Cadastrar-se!</Link>
            </label>
        </div>
    )
}

export default UserLogin;