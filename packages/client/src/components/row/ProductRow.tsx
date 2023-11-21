import { useNavigate } from "react-router-dom";
import { productModel } from "../../databaseInMem/models";

type ProductRowProps = {
    product: productModel
}
 
const ProductRow = ( { product }: ProductRowProps ) => {

    const navigate = useNavigate();

    return (
        <div className="product-list-container" 
            onClick={() => {
                navigate(`/product/${product.productId}`)
            }
        }>
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

export default ProductRow;