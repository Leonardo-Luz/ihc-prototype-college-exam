import { useNavigate } from 'react-router-dom'
import auth from '../services/auth.service'
import '../styles/Profile.style.css'
import { user } from '../databaseInMem/controllers/user.controller'
import { userModel } from '../databaseInMem/models'

import { useState , useEffect } from 'react'
import { historic } from '../databaseInMem/controllers/historic.controller'
import { proposition } from '../databaseInMem/controllers/proposition.controller'
import { product } from '../databaseInMem/controllers/product.controller'

const ProfileImage = () => 
{
    return (
        <div>
            <img className='profile' src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="profile"/>
        </div>
    )
}

const checkLoggedUser = () =>
{ 
    if(auth.loggedId)
        return user.inMemGetUserById(auth.loggedId);
}

type responseProps = {
    status: number,
    message: string,
    response: userModel
}


const ProfileList = () => 
{
    const navigate = useNavigate();

    const [ loggedUser , setLoggedUser ] = useState<userModel | null>(null);

    const check = checkLoggedUser() as Promise<responseProps> | undefined;

    if(check === undefined)
    {
        navigate('/register/user');
    }

    const setUser = async ( check: Promise<responseProps> ) => 
    {
        await check.then((data) => {
            setLoggedUser(data.response);
        })    
    }

    useEffect( () => { if(check) setUser(check) } );
        
    return (
        <div className='list'>        
            <label className='list-item'><p>Nome: </p><p>{loggedUser?.username}</p></label> 
            <label className='list-item'><p>Idade: </p><p>{loggedUser?.age}</p></label> 
            <label className='list-item'><p>Email: </p><p>{loggedUser?.email}</p></label> 
            <label className='list-item'><p>Interesses: </p><p>{loggedUser?.interests}</p></label>
        </div>
    )
}

const Logout = () =>
{
    const navigate = useNavigate();

    return(
        <button onClick={() => {
            auth.logout();
            navigate('/');
        }} className='button-sample'>Sair</button>
    )
}

const Profile = () => {    

    const [ checked , setChecked ] = useState(false);

    const navigate = useNavigate();
    
    const myHistoric = proposition.itens.filter((element) => {
        return (element.receiverId === auth.loggedId ||
        element.senderId === auth.loggedId) &&
        element.propositionId === historic.itens.find((data) => {
            return data.propositionId === element.propositionId
        })?.propositionId
    })

    return (
        <div className='body'>
            <h2>Perfil</h2>
            <div className='content'>
                <ProfileImage />
                <ProfileList />

                <button onClick={() => {                    
                    setChecked(!checked);
                }} className='button-sample'>Histórico</button>
                {
                    (
                        (checked && myHistoric.length === 0) &&
                        <div>Nenhum Histórico!</div>
                    ) ||
                    (
                        (checked && myHistoric) && myHistoric.map(data => {
                            return <div>
                                <hr/>
                                <label>Troca Entre {
                                        user.itens.find(element => {
                                            return element.userId === data.receiverId && 
                                            data.propositionId === proposition.itens.find(aaa => {
                                                return aaa.receiverId === element.userId &&
                                                aaa.receiverId === data.receiverId
                                            })?.propositionId
                                        })?.username
                                    } & {
                                        user.itens.find(element => {
                                            return element.userId === data.senderId && 
                                            data.propositionId === proposition.itens.find(aaa => {
                                                return aaa.senderId === element.userId &&
                                                aaa.senderId === data.senderId
                                            })?.propositionId
                                        })?.username
                                    }</label><br/>
                                <label>{
                                    product.itens.find(element => {
                                        return element.productId === data.productReceiverId
                                    })?.name
                                    } trocado por {
                                        product.itens.find(element => {
                                            return element.productId === data.productSenderId
                                        })?.name
                                    }</label><br/>
                                <label>Finalizado dia : {
                                historic.itens.find(element => {
                                    return element.propositionId === data.propositionId &&
                                        element.data !== undefined
                                    })?.data
                                }</label>
                            </div>
                        }) 
                    )
                }

                <button className='button-sample' onClick={() => {
                    navigate(`/update/user/${auth.loggedId}`);
                }}>Editar</button>

                <Logout/>
            </div>
        </div>
    )
}

export default Profile;