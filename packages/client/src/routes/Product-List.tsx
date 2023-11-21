import { product } from "../databaseInMem/controllers/product.controller";

import ProductRow from '../components/row/ProductRow';

const ProductList = () => {
    return (
        <div className="body">
            {
                (
                    product.itens.length === 0 && <tr><td>No Data</td></tr>
                ) ||
                (
                    product.itens && product.itens.map( (data) => {
                        return <ProductRow product={data} /> 
                    }) 
                )
            }
        </div>
    )
}

export default ProductList;