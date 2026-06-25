import { useEffect, useState } from "react";

import API from "../services/api";

import ProductCard from "../components/ProductCard";

function ecommercehome() {

    const [

        products,

        setProducts

    ] = useState([]);

    const loadProducts =
        async()=>{

            try{

                const res =
                    await API.get(

                        "/products"

                    );

                setProducts(

                    res.data

                );

            }

            catch(error){

                console.log(error);

            }

        };

    useEffect(()=>{

        loadProducts();

    },[]);

    return(

        <div>

            <h1>

                E-Commerce Store

            </h1>

            {

                products.map(

                    product=>(

                        <ProductCard

                            key={

                                product._id

                            }

                            product={

                                product

                            }

                        />

                    )

                )

            }

        </div>

    );

}

export default ecommercehome;