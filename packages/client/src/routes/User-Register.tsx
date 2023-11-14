import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput, FormButton } from "../components/form/FormElements";
import "../styles/form.style.css"

import { userModel } from "../databaseInMem/models";


const UserRegister = () => {

    const navigate = useNavigate();

    const [ user , setUser ] = useState<userModel | null>(null);

    const changeHandle = ( e: any ) =>
    {
        const parameter = e.currentTarget.id as 
            'name' |
            'email' |
            'age' |
            'interests'

        const newUser = { ...user } as userModel;

        newUser[parameter] = parseInt(e.currentTarget.value);

        setUser(newUser);

    }

    const submitHandle = () =>
    {   

    }


    return (
        <div className="body">
            <div className="form">
                <h1>Cadastrar Usuário</h1>
                <div className="">
                    <FormInput id="name" changeHandler={changeHandle} type="text">Nome: </FormInput>
                    <FormInput id="age" changeHandler={changeHandle} type="number">Idade: </FormInput>
                    <FormInput id="email" changeHandler={changeHandle} type="text">Email: </FormInput>
                    <FormInput id="interests" changeHandler={changeHandle} type="text">Interesses: </FormInput>
                </div>
                <FormButton changeHandler={submitHandle}>Enviar</FormButton>
            </div>
        </div>
    )
}

export default UserRegister;