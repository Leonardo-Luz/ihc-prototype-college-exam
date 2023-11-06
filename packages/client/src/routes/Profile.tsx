import '../styles/Profile.style.css'

const ProfileImage = () => 
{
    return (
        <div>
            <img className='profile' src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="profile"/>
        </div>
    )
}

const ProfileList = () => 
{
    return (
        <div className='list'>
                <label className='list-item'><p>Nome: </p><p>Carlos Roberto</p></label>
                <label className='list-item'><p>Idade: </p><p>16 anos</p></label>
                <label className='list-item'><p>Email: </p><p>exemplo@gmail.com</p></label>
                <label className='list-item'><p>Interesses: </p><p>Esportes e Caminhada</p></label>
        </div>
    )
}

const Profile = () => {
    return (
        <div className='body'>
            <div className='content'>
                <ProfileImage />
                <ProfileList />
            </div>
    </div>
    )
}

export default Profile;