import { Link, useNavigate, useParams } from 'react-router-dom';
import { FormButton, FormInput, FormRadio } from '../components/form/FormElements';
import '../styles/form.style.css';
import { useState } from 'react';
import { productModel } from '../databaseInMem/models';
import { product } from '../databaseInMem/controllers/product.controller';
import auth from '../services/auth.service';

const ProductUpdate = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    if(auth.loggedId === null)
      navigate('/register/user')  


    const [ validationError , setValidationError] = useState({
        name: 'Nome não pode estar vazio',
        description: 'Descrição não pode estar vazio',
        stock: 'Estoque inválido',
    }) 

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
        const newErrors = {...validationError}

        if(e.currentTarget.value === '' && (parameter === 'name' || parameter === 'description' || parameter === 'stock'))
            newErrors[parameter] = `${parameter} não pode estar vazio`;  
        else if(parameter === 'stock' && parseInt(e.currentTarget.value) <= 0 )
        {
            newErrors[parameter] = `${parameter} inválido`;  
        }
        else if (parameter === 'name' || parameter === 'description' || parameter === 'stock')
        {
            newErrors[parameter] = '';
        }        

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
        setValidationError(newErrors);
    }

    const submitHandle = () =>
    {   

        if(
            validationError.description !== '' ||
            validationError.stock !== '' ||
            validationError.name !== ''
        )
        {
            alert(`${
                (validationError.description !== '' && validationError.description + '\n') || 
                (validationError.description === '' && '')
            }${
                (validationError.name !== '' && validationError.name + '\n') || 
                (validationError.name === '' && '')
            }${
                (validationError.stock !== '' && validationError.stock + '\n') || 
                (validationError.stock === '' && '')
            }
            `);

            return;
        }

        console.log(productTemp?.image);

        if(productTemp && id && auth.loggedId)
        {
            productTemp.userId = auth.loggedId;
            product.inMemUpdateProduct({...productTemp}, parseInt(id));
        }

        navigate('/');
    }

    return (
        <div className="body">            
            <label className="form" onKeyDown={(e) => {
                if(e.key === 'Enter')
                {
                    submitHandle()
                }
            }}>
                <h1>Modificar Produto</h1>

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
                
                <FormButton clickHandler={submitHandle}>Atualizar</FormButton>

                <Link to={'/'}>Cancelar</Link>
                
            </label>
        </div>
    )
}

export default ProductUpdate;