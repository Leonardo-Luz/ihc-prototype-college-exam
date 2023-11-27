import { product } from "../databaseInMem/controllers/product.controller";

import ProductRow from '../components/row/ProductRow';

const ProductList = () => {


    const activeProds = product.itens.filter((data) => {
        return data.situation === true
    })

    return (


        <div className="body">
            {
                (
                    activeProds.length === 0 && <tr><td>No Data</td></tr>
                ) ||
                (
                    activeProds && activeProds.map( (data) => {
                        return <ProductRow product={data} /> 
                    }) 
                )
            }
        </div>
    )
}

export default ProductList;