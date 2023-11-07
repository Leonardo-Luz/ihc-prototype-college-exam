import '../../styles/navbar.style.css'
import NavbarLink from './NavbarElements';
import profile from '../../images/profile.png'
import { useState } from 'react';

const Navbar = () => 
{

    const [clicked , setClicked] = useState<boolean>(false);

    const clickHandle = () => 
    {
        setClicked(!clicked);
    }


    return(
        <div id='navbar'>
            {<input type="checkbox" id='hamburger-input' readOnly checked={clicked} />}
            <div id="inside">
                <label id="hamburger-menu" onClick={() => {clickHandle()}} />

                <div id='links' onClick={() => {clickHandle()}}>
                    <p className='menu-button'>Menu</p>
                    <NavbarLink href='/'>Home</NavbarLink>
                    <NavbarLink href='/'>Adicionar Proposta</NavbarLink>
                    <NavbarLink href='/'>Minhas Propostas</NavbarLink>
                </div>

                <div id="Links">
                </div>
                <NavbarLink href='/profile'><img src={profile} alt='Profile'/></NavbarLink>
            </div>

            <div className="overlay" onClick={() => {clickHandle()}}></div>      
        </div>
    )
}

export default Navbar;