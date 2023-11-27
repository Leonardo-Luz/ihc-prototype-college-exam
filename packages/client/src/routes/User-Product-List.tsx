import { product } from "../databaseInMem/controllers/product.controller";
import auth from '../services/auth.service';

import ProductRow from '../components/row/ProductRow';

import '../styles/product-container.style.css';

const UserProductList = () => {

    const userProductList = product.itens.filter( (data) => {
        return data.userId === auth.loggedId && 
            data.situation === true
    })


    return (
        <div className="body">
            <h1>Minhas Propostas</h1>
            <div className="product-list">
            {
                (
                    userProductList.length === 0 && <tr><td>Sem Produtos Cadastrados</td></tr>
                ) ||
                (
                    userProductList && userProductList.map( (data) => {
                        return <ProductRow product={data} /> 
                    }) 
                )
            }
            </div>
        </div>
    )
}

export default UserProductList;