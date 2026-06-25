import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import CartItem from "../components/CartItem";

function ecommercecart() {
    const navigate = useNavigate();

    const [cart, setCart] = useState(null);

    const loadCart = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await API.get(

                "/cart",

                {

                    headers: {

                        Authorization:

                            `Bearer ${token}`

                    }

                }

            );

            setCart(res.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const checkout = async () => {

    try {

        const token =
            localStorage.getItem("token");

        const res =
            await API.post(

                "/orders",

                {},

                {

                    headers: {

                        Authorization:

                        `Bearer ${token}`

                    }

                }

            );

        alert(

            res.data.message

        );

        navigate("/orders");

    }

    catch(error){

        alert(

            error.response.data.message

        );

    }

};

    useEffect(() => {

        loadCart();

    }, []);

    if (!cart) {

        return <h2>Loading...</h2>;

    }

    return (

        <div>

            <h1>

                My Cart

            </h1>

            {

                cart.products.map(

                    item => (

                        <CartItem

                            key={item.product._id}

                            item={item}

                            loadCart = {loadCart}

                        />

                    )

                )

            }

            <hr />

            <h2>

                Subtotal :

                ₹ {cart.subtotal}

            </h2>

            <h3>

                Shipping :

                ₹ {cart.shipping}

            </h3>

            <h3>

                Tax :

                ₹ {cart.tax}

            </h3>

            <h2>

                Grand Total :

                ₹ {cart.grandTotal}

            </h2>
            <button
    onClick={checkout}
>

    Checkout

</button>
        </div>

    );

}

export default ecommercecart;