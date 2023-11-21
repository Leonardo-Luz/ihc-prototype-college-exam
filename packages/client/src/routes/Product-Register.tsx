import { useNavigate } from 'react-router-dom';
import { FormButton, FormInput, FormRadio } from '../components/form/FormElements';
import '../styles/form.style.css';
import { useState } from 'react';
import { productModel } from '../databaseInMem/models';
import { product } from '../databaseInMem/controllers/product.controller';
import auth from '../services/auth.service';

const ProductRegister = () => {

    const navigate = useNavigate();

    if(auth.loggedId === null)
      navigate('/register/user')  


    const [ productTemp , setProductTemp ] = useState<productModel | null>({
        name: '',
        description: '',
        category: 'produto',
        stock: 0,
        userId: -999,
        productId: -999,
        situation: true
    });

    const changeHandle = ( e: any ) =>
    {
        const parameter = e.currentTarget.id as 
            'name' |
            'description' |
            'stock' |
            'image' |
            'category'

            console.log(parameter);
            console.log(e.currentTarget.value);
        

        const newProduct = { ...productTemp } as productModel;

        if(parameter === 'name')
            newProduct[parameter] = e.currentTarget.value;
        else if(parameter === 'description')
            newProduct[parameter] = e.currentTarget.value;
        else if(parameter === 'stock')
            newProduct[parameter] = e.currentTarget.value;
        else if(parameter === 'image')
            newProduct[parameter] = e.currentTarget.files[0];
        else if(parameter === 'category')
            newProduct[parameter] = e.currentTarget.value;

        if(newProduct.category !== 'produto')
        {
            newProduct.image = undefined;
        }

        setProductTemp(newProduct);
    }

    const submitHandle = ( e: React.MouseEvent ) =>
    {   
        e.preventDefault();
        
        console.log(productTemp?.image);

        if(productTemp && auth.loggedId)
        {
            productTemp.userId = auth.loggedId;
            product.inMemCreateProduct({...productTemp});
        }

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
                    
                    <FormRadio name='category' id={['produto' , 'servico', 'saber']} changeHandler={changeHandle}>Categoria</FormRadio>
                    {
                        productTemp?.category === 'produto' &&
                        <FormInput id='image' changeHandler={changeHandle} type='file'>Imagem</FormInput>
                    }
                </div>
                
                <FormButton clickHandler={submitHandle}>Enviar</FormButton>

            </div>
        </div>
    )
}

export default ProductRegister;