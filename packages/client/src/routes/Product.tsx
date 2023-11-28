import '../styles/product.style.css'

import { useNavigate, useParams } from "react-router-dom";
import { product } from "../databaseInMem/controllers/product.controller";
import { productModel, userModel } from "../databaseInMem/models";
import React, { useState , useEffect } from 'react';
import { user } from "../databaseInMem/controllers/user.controller";
import auth from '../services/auth.service';
import AlertBox from '../components/alertBox/AlertBox';
import { proposition } from '../databaseInMem/controllers/proposition.controller';
import ProductSelectRow from '../components/row/ProductSelectRow';
import { historic } from '../databaseInMem/controllers/historic.controller';

type CheckPropositionBoxProps = {
    setCheckPropositionBox: React.Dispatch<React.SetStateAction<boolean>>,
    id: number
}

const CheckPropositionBox = ( {setCheckPropositionBox , id}: CheckPropositionBoxProps ) => {

    const [ selectedProduct , setSelectedProduct ] = useState<productModel>();

    historic.itens.forEach((data) => {
        console.log(data.propositionId);
    })


    const filteredPropositions = proposition.itens.filter( (data) => {
        return data.productReceiverId === id &&
        historic.itens.find((element) => {
            return element.propositionId === data.propositionId
        }) === undefined
    })

    const clickHandle = ( data: productModel ) =>
    {
        setSelectedProduct( data );
    }

    const submitHandle = () =>
    {
        
        const selectedProp = proposition.itens.find( (data) => {
            return selectedProduct?.productId === data.productSenderId;
        })

        if(
            selectedProduct && 
            auth.loggedId && 
            selectedProp
        )
        {
            proposition.inMemUpdateProposition({
                ...selectedProp,
                situation: true,
            }, selectedProp.propositionId)

            alert('Proposta aceita!');
        }
    }    

    return(
        <div className='alert-box'>
            <label className='alert-box' onKeyDown={(e) => {
                if(e.key === 'Enter')
                {
                    if(!selectedProduct)
                    {
                        alert('Nenhum produto foi selecionado!');
                        return;
                    } 

                    submitHandle()
                    setCheckPropositionBox(false)
                }
            }}>
                <h1>Selecione uma proposta</h1>
                <div className="alert-box-product-list">
                <label>

                </label>
                {
                    (
                        filteredPropositions.length === 0 && <tr><td>Você ainda não recebeu nenhuma oferta!</td></tr>
                    ) ||
                    (
                        filteredPropositions && filteredPropositions.map( (data) => {                        
                            const productFind = product.itens.find( (element) => {
                                return element.productId === data.productSenderId;
                            })

                            if(productFind)
                            {
                                
                                return <label className='select-product-label' >
                                    <input type='radio' 
                                        className='select-product' 
                                        name='selected-product'  
                                        id='selected-product'
                                        value={productFind.userId.toString()}
                                        onChange={() => clickHandle(productFind)}
                                    >
                                    </input>
                                    <label htmlFor={productFind.userId.toString()}/>
                                    <ProductSelectRow clickHandle={() => clickHandle(productFind)} product={productFind} />                     
                                </label>
                            }
                            
                            return <div>error</div>
                        })
                    )
                }
                </div>

                {
                    selectedProduct &&
                    <p>{selectedProduct.category} {selectedProduct.name} Selecionado</p>
                }


            </label>
            <div className='button-container'>
                <button className='button-sample' onClick={() => {
                    setCheckPropositionBox(false)
                }}>
                    Cancelar
                </button>

                <button className='button-sample' onClick={() => {
                    if(!selectedProduct)
                    {
                        alert('Nenhum produto foi selecionado!');
                        return;
                    }

                    submitHandle()
                    setCheckPropositionBox(false)
                }}>
                    Aceitar
                </button>
            </div>
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
                situation: false
            })

            alert('Proposta enviada!');
        }
    }

    return(
        <div className='alert-box'>
            <label className='alert-box' onKeyDown={(e) => {
                if(e.key === 'Enter')
                {
                    if(!selectedProduct)
                    {
                        alert('Nenhum produto foi selecionado!');
                        return;
                    } 

                    submitHandle();
                    setMakePropositionBox(false)
                }
            }}>
                <h3>Selecione um produto para enviar</h3>
                <div className="alert-box-product-list">
                {
                    (
                        myProduct.find( (data) => {
                            return data.userId === auth.loggedId
                        }) === undefined && <tr><td>Cadastre um produto antes de fazer uma proposta!</td></tr>
                    ) ||
                    (
                        myProduct && 
                        myProduct.map((data) => {
                            return <label className='select-product-label' >
                            <input type='radio' 
                                className='select-product' 
                                name='selected-product'  
                                id='selected-product'
                                value={data.userId.toString()}
                                onChange={() => clickHandle(data)}
                            >
                            </input>
                            <label htmlFor={data.userId.toString()}/>
                            <ProductSelectRow clickHandle={() => clickHandle(data)} product={data} />                     
                        </label>
                })
                    )
                }
                </div>

                {
                    selectedProduct &&
                    <p>{selectedProduct.category} {selectedProduct.name} selecionado</p>
                }


            </label>
            <div className='button-container'>
                <button className='button-sample' onClick={() => {
                    setMakePropositionBox(false)
                }}>
                    Cancelar
                </button>
                <button className='button-sample' onClick={() => {
                    if(!selectedProduct)
                    {
                        alert('Nenhum produto foi selecionado!');
                        return;
                    } 

                    submitHandle();
                    setMakePropositionBox(false)
                }}>
                    Enviar
                </button>
            </div>
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

    const navigate = useNavigate();

    return (
        <div className="body">
            {
                (checkPropositionBox && id) &&
                <AlertBox>
                    <CheckPropositionBox setCheckPropositionBox={setCheckPropositionBox} id={parseInt(id)} />
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
                                (thisProduct.userId !== auth.loggedId &&
                                id && !proposition.itens.find((data)=> {
                                    return data.situation === true &&
                                        data.senderId === auth.loggedId &&
                                        data.productSenderId === parseInt(id)
                                })) &&
                                <button className='button-sample' onClick={() => 
                                    setMakePropositionBox(true)
                                }>Fazer Proposta</button>
                            ) || 
                            (
                                (id && thisProduct.userId === auth.loggedId && !proposition.itens.find((data)=> {
                                    return (data.situation === true &&
                                    data.receiverId === auth.loggedId &&
                                    data.productReceiverId === parseInt(id)) || (
                                        data.situation === true &&
                                        data.senderId === auth.loggedId &&
                                        data.productSenderId === parseInt(id)
                                    )
                                }) ) &&
                                <button className='button-sample' onClick={() => 
                                    setCheckPropositionBox(true)
                                }>Propostas</button>
                            ) || 
                            (
                                (id && proposition.itens.find((data)=> {
                                    return data.situation === true &&
                                        data.receiverId === auth.loggedId &&
                                        data.productReceiverId === parseInt(id)
                                }) ) &&
                                <button className='button-sample' onClick={() => 
                                    navigate(`/chat/${proposition.itens.find((data)=> {
                                        return (
                                            data.situation === true &&
                                            data.receiverId === auth.loggedId &&
                                            data.productReceiverId === parseInt(id)
                                            ) || 
                                            (
                                                data.situation === true &&
                                                data.senderId === auth.loggedId &&
                                                data.productSenderId === parseInt(id)
                                            )
                                    })?.propositionId}`)
                                }>Mensagens</button>
                            ) ||
                            (
                                (id && proposition.itens.find((data)=> {
                                    return data.situation === true &&
                                        data.senderId === auth.loggedId &&
                                        data.productSenderId === parseInt(id)
                                }) ) &&
                                <button className='button-sample' onClick={() => 
                                    navigate(`/chat/${proposition.itens.find((data)=> {
                                        return (
                                            data.situation === true &&
                                            data.receiverId === auth.loggedId &&
                                            data.productReceiverId === parseInt(id)
                                            ) || 
                                            (
                                                data.situation === true &&
                                                data.senderId === auth.loggedId &&
                                                data.productSenderId === parseInt(id)
                                            )
                                    })?.propositionId}`)
                                }>Mensagens</button>
                            )
                        }
                        {
                            thisProduct.userId === auth.loggedId &&
                            <button className='button-sample' onClick={() => {
                                navigate(`/update/product/${id}`);
                            }}>Editar</button>
                        }
                        {
                            thisProduct.userId === auth.loggedId &&
                            <button className='button-sample' onClick={ async () => {
                                if(window.confirm(`Tem certeza que deseja deletar o produto ${thisProduct.name}`))
                                {
                                    if(id)
                                        await product.inMemDeleteProduct(parseInt(id));

                                    navigate('/');
                                }
                            }}>Excluir</button>
                        }

                    </div>
                )
            }
        </div>
    )
}

export default Product;