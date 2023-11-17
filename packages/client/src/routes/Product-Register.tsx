import { useNavigate } from 'react-router-dom';
import { FormButton, FormInput } from '../components/form/FormElements';
import '../styles/form.style.css';
import { useState } from 'react';
import { productModel } from '../databaseInMem/models';
import { product } from '../databaseInMem/controllers/product.controller';
import auth from '../services/auth.service';

const ProductRegister = () => {

    const navigate = useNavigate();

    if(auth.loggedId === null)
      navigate('/register/user')  


    const [ productTemp , setProductTemp ] = useState<productModel | null>(null);

    const changeHandle = ( e: any ) =>
    {
        const parameter = e.currentTarget.id as 
            'name' |
            'description' |
            'stock' |
            'category'

        const newProduct = { ...productTemp } as productModel;

        if(parameter === 'name')
            newProduct[parameter] = e.currentTarget.value;
        else if(parameter === 'description')
            newProduct[parameter] = e.currentTarget.value;
        else if(parameter === 'stock')
            newProduct[parameter] = e.currentTarget.value;
        else if(parameter === 'category')
            newProduct[parameter] = e.currentTarget.value;


        setProductTemp(newProduct);
    }

    const submitHandle = ( e: React.MouseEvent ) =>
    {   
        e.preventDefault();

        if(productTemp)
            product.inMemCreateProduct({...productTemp});

        navigate('/');
    }

    return (
        <div className="body">            
            <div className="form">
                <h1>Cadastrar Produto</h1>

                <div className='form-list'>
                    <FormInput id='name' changeHandler={changeHandle} type='text'>Nome</FormInput>
                    <FormInput id='description' changeHandler={changeHandle} type='text'>Descrição</FormInput>
                    <FormInput id='stock' changeHandler={changeHandle} type='number'>Estoque</FormInput>
                    <FormInput id='category' changeHandler={changeHandle} type='text'>Categoria</FormInput>
                    <FormInput id='' changeHandler={changeHandle} type='file'>Imagem</FormInput>
                </div>
                
                <FormButton clickHandler={submitHandle}>Enviar</FormButton>

            </div>
        </div>
    )
}

export default ProductRegister;