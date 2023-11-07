import React from "react";
import '../../styles/navbar-elements.style.css';

import { Link } from 'react-router-dom';

type navbarLinkProps = {
    children: React.ReactNode;
    href: string
}

const NavbarLink = ( { children , href  }:  navbarLinkProps) => 
{
    return <Link className="link" to={href}>{children}</Link>
}

export default NavbarLink;