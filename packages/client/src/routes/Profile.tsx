import { useNavigate } from 'react-router-dom'
import auth from '../services/auth.service'
import '../styles/Profile.style.css'
import { user } from '../databaseInMem/controllers/user.controller'
import { userModel } from '../databaseInMem/models'

import { useState , useEffect } from 'react'

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
        }}>Sair</button>
    )
}

const Profile = () => {    
    return (
        <div className='body'>
            <div className='content'>
                <ProfileImage />
                <ProfileList />

                <button>Histórico</button>

                <Logout/>
            </div>
    </div>
    )
}

export default Profile;