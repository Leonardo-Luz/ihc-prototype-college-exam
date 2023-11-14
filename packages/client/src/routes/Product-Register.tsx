import React from 'react';
import { FormInput } from '../components/form/FormElements';
import '../styles/form.style.css';

const ProductRegister = () => {

    const clickHandle = ( e: any ) =>
    {
        console.log(e.currentTarget.value);
    }
 
    return (
        <div className="body">
            <div className="form">
                <div>
                    <FormInput id='name' changeHandler={clickHandle} type='text'>Nome</FormInput>
                    <FormInput id='' changeHandler={clickHandle} type='text'>Descrição</FormInput>
                    <FormInput id='' changeHandler={clickHandle} type='text'>Categoria</FormInput>
                    <FormInput id='' changeHandler={clickHandle} type='file'>Imagem</FormInput>

                    <button onClick={(e) => {clickHandle(e)}}>casasc</button>
                </div>
            </div>
        </div>
    )
}

export default ProductRegister;