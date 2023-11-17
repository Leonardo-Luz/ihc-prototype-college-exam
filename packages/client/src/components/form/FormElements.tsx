import '../../styles/form-elements.style.css'

import React from "react";

interface formProps {
    children: React.ReactNode,
}

interface FormInputProps extends formProps {
    type: string,
    placeholder?: string,
    id: string
    changeHandler: ( e: any ) => void
};

interface formButton extends formProps {
    clickHandler: ( e: React.MouseEvent ) => void
}

export const FormInput = ( { children , type , placeholder , changeHandler , id }: FormInputProps ) => 
{
    return (
        <label className='input-field'>
            <p>{children}</p>
            <input 
                type={type} 
                id={id}
                placeholder={placeholder} 
                className='field' 
                onChange={changeHandler}
            ></input>
        </label>
    )
}

export const FormButton = ( { children , clickHandler }: formButton ) =>
{
    return <button onClick={(e) => clickHandler(e)} className='form-button'>{children}</button>
}
