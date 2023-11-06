import '../../styles/navbar.style.css'
import NavbarLink from './NavbarElements';
import profile from '../../images/profile2.png'

const Navbar = () => 
{
    return(
        <div id='navbar'>
            <div id="inside">
                <div id="hamburger-menu">
                </div>

                <div id="Links">
                    <NavbarLink href='/'>Home</NavbarLink>
                    <NavbarLink href='/profile'><img src={profile} alt='Profile'/></NavbarLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar;