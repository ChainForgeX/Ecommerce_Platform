import API from "../services/api";

function CartItem({

    item,

    loadCart

}){

    const removeItem =
    async()=>{

        try{

            const token =
            localStorage.getItem(
                "token"
            );

            await API.delete(

                `/cart/${item.product._id}`,

                {

                    headers:{

                        Authorization:

                        `Bearer ${token}`

                    }

                }

            );

            alert(
                "Product Removed"
            );

            loadCart();

        }
        catch(error){

            console.log(error);

        }

    };

    return(

        <div
            style={{

                border:"1px solid black",

                padding:"20px",

                margin:"20px"

            }}
        >

            <h3>

                {item.product.title}

            </h3>

            <p>

                ₹ {item.product.price}

            </p>

            <p>

                Quantity :
                {item.quantity}

            </p>

            <button
                onClick={removeItem}
            >

                Remove

            </button>

        </div>

    );

}

export default CartItem;