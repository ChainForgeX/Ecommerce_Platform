import {

    useEffect,

    useState

} from "react";

import API from "../services/api";

function Orders(){

    const [

        orders,

        setOrders

    ] = useState([]);

    const loadOrders =
    async()=>{

        try{

            const token =
            localStorage.getItem(
                "token"
            );

            const res =
            await API.get(

                "/orders",

                {

                    headers:{

                        Authorization:

                        `Bearer ${token}`

                    }

                }

            );

            setOrders(

                res.data

            );

        }

        catch(error){

            console.log(error);

        }

    };

    useEffect(()=>{

        loadOrders();

    },[]);

    return(

        <div>

            <h1>

                My Orders

            </h1>

            {

                orders.map(

                    order=>(

                        <div

                            key={

                                order._id

                            }

                            style={{

                                border:

                                "1px solid black",

                                padding:"20px",

                                margin:"20px"

                            }}

                        >

                            <h3>

                                Order

                            </h3>

                            <p>

                                Status :

                                {order.status}

                            </p>

                            <p>

                                Total :

                                ₹ {order.totalAmount}

                            </p>

                        </div>

                    )

                )

            }

        </div>

    );

}

export default Orders;