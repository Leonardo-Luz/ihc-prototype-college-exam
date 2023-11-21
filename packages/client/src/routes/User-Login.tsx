import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormInput, FormButton } from "../components/form/FormElements";
import "../styles/form.style.css"

import { userModel } from "../databaseInMem/models";

import auth from "../services/auth.service";

const UserLogin = () => {

    const navigate = useNavigate();

    const [ userTemp , setUserTemp ] = useState<userModel | null>(null);

    const changeHandle = ( e: any ) =>
    {
        const parameter = e.currentTarget.id as 
            'username' |
            'password'

        const newUser = { ...userTemp } as userModel;

        if(parameter === 'username')
            newUser[parameter] = e.currentTarget.value;
        else if(parameter === 'password')
            newUser[parameter] = e.currentTarget.value;

        setUserTemp(newUser);
    }

    const submitHandle = async ( e: React.MouseEvent ) =>
    {   
        e.preventDefault();
        
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
            <div className="form">
                <h1>Login</h1>
                <div className="form-list">
                    <FormInput id="username" changeHandler={changeHandle} type="text">Nome: </FormInput>
                    <FormInput id="password" changeHandler={changeHandle} type="password">Senha: </FormInput>
                </div>
                <FormButton clickHandler={submitHandle}>Enviar</FormButton>

                <Link to={'/register/user'} >Cadastrar-se!</Link>
            </div>
        </div>
    )
}

export default UserLogin;