import { useState } from "react";
import ProductRow from "../components/row/ProductRow";
import { product } from "../databaseInMem/controllers/product.controller";

import '../styles/product-container.style.css'
import { productModel } from "../databaseInMem/models";
import auth from "../services/auth.service";
import { useNavigate } from "react-router";


const Home = () => {

    const navigate = useNavigate();

    const [filteredProducts , setFilteredProducts ] = useState<productModel[]>(product.itens.filter((data) => {
        return data.situation === true
    }));

    const changeHandle = ( e: any ) =>
    {
        setFilteredProducts(product.itens.filter((data) => {
            return data.situation === true && ((
                !checked && 
                (
                    data.name.toLowerCase().includes(e.currentTarget.value.toLowerCase())
                )
            ) ||
            (
                myProdCheck && 
                (
                    data.name.toLowerCase().includes(e.currentTarget.value.toLowerCase()) &&
                    data.userId === auth.loggedId
                )
            ) ||            
            (
                !myProdCheck &&
                (
                    data.name.toLowerCase().includes(e.currentTarget.value.toLowerCase()) &&
                    data.userId !== auth.loggedId
                )
            ))
        }))
    }

    const [checked , setChecked] = useState(false);

    const [myProdCheck , setMyProdCheck] = useState(false);

    return (
        <div className="body">
            
            <h1>Página Inicial</h1>

            <div className="search-container">
                <label>Buscar: <input type="text" onChange={(e) => changeHandle(e)} ></input></label>
                <label>filtro: <input type="checkbox" defaultChecked={checked} onChange={() => {
                    setChecked(!checked);
                }}/></label>
                {
                    checked && 
                    <div>
                        <hr/>
                        <label>Meus Produtos: <input type="checkbox" defaultChecked={myProdCheck} onChange={(e) => {
                            setMyProdCheck(!myProdCheck);
                        }}/></label>
                    </div>
                }
            </div>

            <div className="product-list">
            {
                (
                    filteredProducts.length === 0 && <tr><td>Sem Produtos Cadastrados</td></tr>
                ) ||
                (
                    filteredProducts && filteredProducts.map( (data) => {
                        return <ProductRow product={data} /> 
                    }) 
                )
            }
            </div>
        </div>
    )
}

export default Home;