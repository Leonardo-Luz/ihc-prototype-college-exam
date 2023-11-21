import '../../styles/form-elements.style.css'

import React from "react";

interface FormInputProps{
    children: React.ReactNode,
    type: string,
    placeholder?: string,
    id: string
    changeHandler: ( e: any ) => void
};

interface FormRadioProps{
    children: React.ReactNode,
    id: string[],
    name: string,
    changeHandler: ( e: any ) => void
};

interface formButton{
    children: React.ReactNode,
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

export const FormRadio = ( { children , changeHandler , id , name }: FormRadioProps ) => 
{
    return (
        <label className='input-field'>
            <p>{children}</p>
            <div className='radio-field'>
            {
                id.map( (element: string) => {
                    return (
                        <div>
                            <input 
                            type='radio' 
                            id={name}
                            name={name}
                            className='field' 
                            onChange={changeHandler}
                            value={element}
                            defaultChecked={element === 'produto' && true}
                            ></input>
                            <label htmlFor={element}>{element}</label>
                        </div>
                    )
                })
            }
            </div>
        </label>
    )
}

export const FormButton = ( { children , clickHandler }: formButton ) =>
{
    return <button onClick={(e) => clickHandler(e)} className='form-button'>{children}</button>
}
