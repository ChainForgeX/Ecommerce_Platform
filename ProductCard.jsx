import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
    const navigate = useNavigate();

    return (

        <div
            style={{

                border: "1px solid black",

                padding: "20px",

                margin: "20px",

                width: "250px"

            }}
        >

            <h3>

                {product.title}

            </h3>

            <p>

                {product.description}

            </p>

            <h4>

                ₹ {product.price}

            </h4>

            <p>

                Stock : {product.stock}

            </p>

            <button onClick={() => navigate(
            `/product/${product._id}`
            )}> View Product </button>

        </div>

    );

}

export default ProductCard;