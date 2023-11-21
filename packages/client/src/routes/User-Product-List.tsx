import { product } from "../databaseInMem/controllers/product.controller";
import auth from '../services/auth.service';

import ProductRow from '../components/row/ProductRow';

const UserProductList = () => {

    const userProductList = product.itens.filter( (data) => {
        return data.userId === auth.loggedId
    })


    return (
        <div className="body">
            {
                (
                    userProductList.length === 0 && <tr><td>No Data</td></tr>
                ) ||
                (
                    userProductList && userProductList.map( (data) => {
                        return <ProductRow product={data} /> 
                    }) 
                )
            }

            {/* new product */}

        </div>
    )
}

export default UserProductList;