import ProductRow from "../components/row/ProductRow";
import { product } from "../databaseInMem/controllers/product.controller";

import '../styles/product-container.style.css'


const Home = () => {
    return (
        <div className="body">
            Home
            <div className="product-list">
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
        </div>
    )
}

export default Home;