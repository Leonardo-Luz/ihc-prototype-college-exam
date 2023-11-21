import '../styles/product.style.css'

import { useParams } from "react-router-dom";
import { product } from "../databaseInMem/controllers/product.controller";
import { productModel, propositionModel, userModel } from "../databaseInMem/models";
import React, { useState , useEffect } from 'react';
import { user } from "../databaseInMem/controllers/user.controller";
import auth from '../services/auth.service';
import AlertBox from '../components/alertBox/AlertBox';
import ProductRow from '../components/row/ProductRow';
import { proposition } from '../databaseInMem/controllers/proposition.controller';
import ProductSelectRow from '../components/row/ProductSelectRow';

type CheckPropositionBoxProps = {
    setCheckPropositionBox: React.Dispatch<React.SetStateAction<boolean>>,
}

const CheckPropositionBox = ( {setCheckPropositionBox}: CheckPropositionBoxProps ) => {

    const [productReceived , setProductReceived] = useState<productModel>();

    const getProductReceived = async (data: propositionModel) => {
        setProductReceived(await product.inMemGetProductById(data.productReceiverId).then((data) => data.response));
    }

    return(
        <div>
            <div className="product-list">
            {
                (
                    proposition.itens.length === 0 && <tr><td>No Data</td></tr>
                ) ||
                (
                    proposition.itens.find((element) => {
                        return element.receiverId === auth.loggedId
                    }) === undefined && <tr><td>No Data</td></tr>
                ) ||
                (
                    proposition.itens && proposition.itens.map( (data) => {

                        getProductReceived(data);

                        if(productReceived)
                            return <ProductRow product={productReceived} /> 
                        
                        return <div>error</div>
                    })
                )
            }
            </div>

            <button onClick={() => {
                setCheckPropositionBox(false)
            }}>
                Cancelar
            </button>
        </div>
    )
}

type MakePropositionBoxProps = {
    setMakePropositionBox: React.Dispatch<React.SetStateAction<boolean>>,
    id: number
}

const MakePropositionBox = ( {setMakePropositionBox , id}: MakePropositionBoxProps ) => {

    const [ selectedProduct , setSelectedProduct ] = useState<productModel>();

    const [ productUser , setProductUser ] = useState<productModel>();

    const myProduct = product.itens.filter( (data) => {
        return data.userId === auth.loggedId &&
            proposition.itens.find( (element) => {
                return (element.productSenderId === data.productId &&
                        element.productReceiverId === id
                        ) ||
                        element.productReceiverId === data.productId
            }) === undefined
    })

    const asyncSet = async () =>{
        setProductUser(await product.inMemGetProductById(id).then((data) => data.response))
    }

    useEffect( () => {asyncSet()})

    const clickHandle = ( data: productModel ) =>
    {
        setSelectedProduct( data );
    }

    const submitHandle = () =>
    {
        
        if(
            selectedProduct && 
            auth.loggedId && 
            productUser &&
            proposition.itens.find( (data) => 
            {
                return selectedProduct &&
                data.productSenderId === selectedProduct.productId &&
                data.productReceiverId === id
            }) === undefined
        )
        {
            proposition.inMemCreateProposition({
                productSenderId: selectedProduct.productId,
                productReceiverId: id,
                senderId: auth.loggedId,
                receiverId: productUser.userId,
                propositionId: -9999,
                situation: true
            })
        }
    }

    return(
        <div>
            <div className="product-list">
            {
                (
                    myProduct.find( (data) => {
                        return data.userId === auth.loggedId
                    }) === undefined && <tr><td>No Data</td></tr>
                ) ||
                (
                    myProduct && 
                    myProduct.map((data) => {
                        return <ProductSelectRow clickHandle={() => clickHandle(data) } product={data} />                         
                    })
                )
            }
            </div>

            <button onClick={() => {
                setMakePropositionBox(false)
            }}>
                Cancelar
            </button>

            <button onClick={() => {
                submitHandle();
            }}>
                Enviar
            </button>

        </div>
    )
}

const Product = () => {
    
    const { id } = useParams();
    
    const [ thisProduct , setThisProduct] = useState<productModel>()
    const [ thisUser , setThisUser] = useState<userModel>()
    
    const [checkPropositionBox , setCheckPropositionBox] = useState(false);

    const [makePropositionBox , setMakePropositionBox] = useState(false);

    const setProduct = async () => {
        if(id)
        {
            setThisProduct((await product.inMemGetProductById(parseInt(id))).response);

            if(thisProduct)
                setThisUser((await user.inMemGetUserById(thisProduct.userId)).response)
        }
    }

    useEffect( () => {setProduct()});

    return (
        <div className="body">
            {
                checkPropositionBox &&
                <AlertBox>
                    <CheckPropositionBox setCheckPropositionBox={setCheckPropositionBox} />
                </AlertBox>
            }
            {
                (makePropositionBox && id) &&
                <AlertBox>                    
                    <MakePropositionBox setMakePropositionBox={setMakePropositionBox} id={parseInt(id)} />
                </AlertBox>
            }
            {
                thisProduct &&
                (
                    <div className="container">
                    {
                        thisProduct.image &&
                        <div className='img-holder'>
                            <img src={URL.createObjectURL(thisProduct.image)} alt={thisProduct.name} /> 
                        </div>
                    }
                        <div>
                            <p>Nome do Produto: {thisProduct.name}</p>
                            <p>Descrição: {thisProduct.description}</p>
                            <p>Estoque: {thisProduct.stock}</p>
                            <p>Nome do Usuário: {thisUser?.username}</p>
                            <p>Categoria: {thisProduct.category}</p>
                        </div>

                        {
                            (
                                thisProduct.userId !== auth.loggedId &&
                                <button onClick={() => 
                                    setMakePropositionBox(true)
                                }>Fazer Proposta</button>
                            ) || 
                            (
                                thisProduct.userId === auth.loggedId &&
                                <button onClick={() => 
                                    setCheckPropositionBox(true)
                                }>Propostas</button>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Product;