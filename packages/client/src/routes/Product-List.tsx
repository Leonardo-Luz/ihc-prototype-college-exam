import { InMemoryProduct } from "../databaseInMem/controllers/product.controller";
import { productModel } from "../databaseInMem/models";

type ProductRowProps = {
    product: productModel
}

const ProductRow = ( { product }: ProductRowProps ) => {
    return (
        <tr>
            <td>{product.productId}</td>
            <td>{product.createdAt}</td>
            <td>{product.updatedAt}</td>
        </tr>
    )
}

const ProductHead = () => {
    return (
        <thead>
            <td>ID</td>
            <td>createdAt</td>
            <td>updatedAt</td>
        </thead>
    )
}

const ProductList = () => {
    const product = new InMemoryProduct();

    product.inMemCreateProduct({
        category: 'produto',
        description: 'aaaaa',
        name: 'bola',
        productId: product.itens.length + 1,
        stock: 3,
    })

    product.inMemCreateProduct({
        category: 'produto',
        description: 'aaaaa',
        name: 'bola',
        productId: product.itens.length + 1,
        stock: 3,
    })    

    return (
        <table>
            <ProductHead/>
            <tbody>
                {
                    product.itens && product.itens.map( (data) => {
                        return <ProductRow product={data} /> 
                    })
                }
            </tbody>
        </table>
    )
}

export default ProductList;