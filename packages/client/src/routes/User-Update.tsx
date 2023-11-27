import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FormInput, FormButton } from "../components/form/FormElements";
import "../styles/form.style.css"

import { userModel } from "../databaseInMem/models";
import { user } from "../databaseInMem/controllers/user.controller";
import auth from "../services/auth.service";


const UserUpdate = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [ userTemp , setUserTemp ] = useState<userModel | null>(null);

    const [ validationError , setValidationError] = useState({
        username: 'Usuário não pode estar vazio',
        password: 'Senha não pode estar vazio',
        age: 'Idade não pode estar vazio',
        email: 'Email não pode estar vazio',
        interests: 'Interesses não pode estar vazio', 
    }) 

    const changeHandle = ( e: any ) =>
    {
        const parameter = e.currentTarget.id as 
            'username' |
            'email' |
            'age' |
            'password' |
            'interests'

        const newUser = { ...userTemp } as userModel;
        const newErrors = { ...validationError };


        if(e.currentTarget.value === '' && (parameter === 'username' || parameter === 'email' || parameter === 'age' || parameter === 'interests' || parameter === 'password'))
            newErrors[parameter] = `${parameter} não pode estar vazio`;
        else if(parameter === 'username' && user.itens.find((data) => {
            return data.username === e.currentTarget.value
        }) !== undefined)
        {
            newErrors[parameter] = `${parameter} já está em uso!`;
        }
        else if (parameter === 'age' && (e.currentTarget.value <= 0))
        {
            newErrors[parameter] = 'Idade inválida';
        }    
        else if (parameter === 'username' || parameter === 'email' || parameter === 'age' || parameter === 'interests' || parameter === 'password')
        {
            newErrors[parameter] = '';
        }

        if(parameter === 'username')
        {
            newUser[parameter] = e.currentTarget.value;
        }
        else if(parameter === 'email')
            newUser[parameter] = e.currentTarget.value;
        else if(parameter === 'password')
            newUser[parameter] = e.currentTarget.value;
        else if(parameter === 'age')
            newUser[parameter] = e.currentTarget.value;
        else if(parameter === 'interests')
            newUser[parameter] = e.currentTarget.value;


        setUserTemp(newUser);
        setValidationError(newErrors);

    }

    const submitHandle = async () =>
    {   

        if(
            validationError.age !== '' ||
            validationError.email !== '' ||
            validationError.interests !== '' ||
            validationError.password !== '' ||
            validationError.username !== ''
        )
        {
            alert(`${
                (validationError.age !== '' && validationError.age + '\n') ||
                (validationError.age === '' && '')
            }${
                (validationError.email !== '' && validationError.email + '\n') || 
                (validationError.email === '' && '')
            }${
                (validationError.interests !== '' && validationError.interests + '\n') || 
                (validationError.interests === '' && '')
            }${
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


        if(userRegister && id)
        {
            await user.inMemUpdateUser({...userRegister}, parseInt(id));

            
            await auth.login(userRegister);

            navigate('/profile');
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
                <h1>Modificar Usuário</h1>
                <div className="form-list">
                    <FormInput id="username" changeHandler={changeHandle} type="text">Nome: </FormInput>
                    <FormInput id="password" changeHandler={changeHandle} type="password">Senha: </FormInput>
                    <FormInput id="age" changeHandler={changeHandle} type="number">Idade: </FormInput>
                    <FormInput id="email" changeHandler={changeHandle} type="text">Email: </FormInput>
                    <FormInput id="interests" changeHandler={changeHandle} type="text">Interesses: </FormInput>
                </div>
                <FormButton clickHandler={submitHandle}>Enviar</FormButton>

                <Link to={'/'} >Cancelar</Link>
            </label>
        </div>
    )
}

export default UserUpdate;