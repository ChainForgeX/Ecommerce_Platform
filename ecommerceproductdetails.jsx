import {

    useEffect,

    useState

} from "react";

import {

    useParams

} from "react-router-dom";

import API from "../services/api";
import { useNavigate } from "react-router-dom";

function ecommerceproductdetails() {
    const navigate = useNavigate();

   const {

        id

    } = useParams();

    const [

        product,

        setProduct

    ] = useState(null);

    const loadProduct =
    async()=>{

        try{

            const res =
            await API.get(

                `/products/${id}`

            );

            setProduct(

                res.data

            );

        }
        catch(error){

            console.log(error);

        }

    };

    const addToCart = async () => {

    try {

        const token =
            localStorage.getItem("token");

        await API.post(

            "/cart",

            {

                productId: product._id,

                quantity: 1

            },

            {

                headers: {

                    Authorization:

                        `Bearer ${token}`

                }

            }

        );

        alert(

            "Product Added To Cart"

        );

        navigate("/cart");

    }

    catch (error) {

        alert(

            error.response.data.message

        );

    }

};

    useEffect(()=>{

        loadProduct();

    },[]);

    if(!product){

        return(

            <h2>

                Loading...

            </h2>

        );

    }

    return(

        <div>

            <h1>

                {product.title}

            </h1>

            <p>

                {product.description}

            </p>

            <h2>

                ₹ {product.price}

            </h2>

            <p>

                Stock : {product.stock}

            </p>

            <button onClick={addToCart}>Add To Cart</button>
            <p>

                Category :

                {product.category}

            </p>

        </div>

    );

}

export default ecommerceproductdetails;