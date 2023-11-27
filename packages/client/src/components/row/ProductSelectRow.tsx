import { productModel } from "../../databaseInMem/models";

type ProductRowProps = {
    product: productModel,
    clickHandle: () => void
}
 
const ProductSelectRow = ( { product , clickHandle }: ProductRowProps ) => {

    return (
        <div className="selected-product-list-container" 
            onClick={clickHandle}
        >
        {
            product.image &&
            <div className="product-img-holder">
                <img src={URL.createObjectURL(product.image)} alt={product.name} />
            </div>
        }
            <div className="product-attributes">
                <p>{product.category}: {product.name}</p>
                <p>Estoque: {product.stock}</p>
                <p>Categoria: {product.category}</p>
            </div>
        </div>
    )
}

export default ProductSelectRow;