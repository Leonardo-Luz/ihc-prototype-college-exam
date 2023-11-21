import React from "react"
import { Link } from "react-router-dom"


type AlertBoxButtonProps = {
    children: React.ReactNode,
}

type AlertBoxLinkProps = {
    children: React.ReactNode,
    to: string
}


export const AlertBoxLink = ( {children , to }: AlertBoxLinkProps ) => {
    return (
        <Link to={to} >{children}</Link>
    )
}

export const AlertBoxButton = ( {children}: AlertBoxButtonProps ) => {
    return (
        <button>{children}</button>
    )
}
