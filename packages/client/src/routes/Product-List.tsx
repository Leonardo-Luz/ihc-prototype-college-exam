import '../styles/table.style.css'

import { product } from "../databaseInMem/controllers/product.controller";
import { productModel } from "../databaseInMem/models";

type ProductRowProps = {
    product: productModel
}
 
const ProductRow = ( { product }: ProductRowProps ) => {
    return (
        <tr className='row'>
            <td className='col' >{product.productId}</td>
            <td className='col' >{product.name}</td>
            <td className='col' >{product.description}</td>
            <td className='col' >{product.stock}</td>
            <td className='col' >{product.category}</td>
        </tr>
    )
}

const ProductHead = () => {
    return (
        <thead className='thead'>
            <tr className='row'>
                <td className='col' >ID</td>
                <td className='col' >Nome</td>
                <td className='col' >Descrição</td>
                <td className='col' >Estoque</td>
                <td className='col' >Categoria</td>
            </tr>
        </thead>
    )
}

const ProductList = () => {
    return (
        <div className="body">
            <table className='table'>
                <ProductHead/>
                <tbody className='tbody'>
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
                </tbody>
            </table>
        </div>
    )
}

export default ProductList;