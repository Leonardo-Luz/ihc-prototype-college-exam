import React from "react";

import { Link } from 'react-router-dom';

type navbarLinkProps = {
    children: React.ReactNode;
    href: string
}

const NavbarLink = ( { children , href  }:  navbarLinkProps) => 
{
    return <Link to={href}>{children}</Link>
}

export default NavbarLink;