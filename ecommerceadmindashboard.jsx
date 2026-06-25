import { useEffect, useState } from "react";

import API from "../services/api";

function AdminDashboard() {

    const [products, setProducts] = useState([]);

    const [orders, setOrders] = useState([]);

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [price, setPrice] = useState("");

    const [category, setCategory] = useState("");

    const [stock, setStock] = useState("");

    const [editId, setEditId] = useState(null);

    const loadProducts = async () => {

        try {

            const res = await API.get("/products");

            setProducts(res.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const createProduct = async () => {

    try {

        const token =

            localStorage.getItem(

                "token"

            );

        await API.post(

            "/products",

            {

                title,

                description,

                price,

                category,

                stock

            },

            {

                headers:{

                    Authorization:

                    `Bearer ${token}`

                }

            }

        );

        alert(

            "Product Created"

        );

        setTitle("");

        setDescription("");

        setPrice("");

        setCategory("");

        setStock("");

        loadProducts();

    }

    catch(error){

        alert(

            error.response.data.message

        );

    }

};

const deleteProduct = async (id) => {

    try {

        const token =
            localStorage.getItem("token");

        await API.delete(

            `/products/${id}`,

            {

                headers: {

                    Authorization:

                        `Bearer ${token}`

                }

            }

        );

        alert("Product Deleted");

        loadProducts();

    }

    catch (error) {

        alert(

            error.response.data.message

        );

    }

};

const editProduct = (product)=>{

    setEditId(product._id);

    setTitle(product.title);

    setDescription(product.description);

    setPrice(product.price);

    setCategory(product.category);

    setStock(product.stock);

};

const updateProduct = async () => {

    try {

        const token =
            localStorage.getItem("token");

        await API.put(

            `/products/${editId}`,

            {

                title,

                description,

                price,

                category,

                stock

            },

            {

                headers: {

                    Authorization:

                        `Bearer ${token}`

                }

            }

        );

        alert(

            "Product Updated"

        );

        setEditId(null);

        setTitle("");

        setDescription("");

        setPrice("");

        setCategory("");

        setStock("");

        loadProducts();

    }

    catch (error) {

        alert(

            error.response.data.message

        );

    }

};

const updateOrderStatus = async (id, status) => {

    try {

        const token =
            localStorage.getItem("token");

        await API.put(

            `/orders/${id}`,

            {

                status

            },

            {

                headers: {

                    Authorization:

                        `Bearer ${token}`

                }

            }

        );

        alert("Order Updated");

        loadOrders();

    }

    catch (error) {

        console.log(error);

    }

};

const loadOrders = async () => {

    try {

        const token =
            localStorage.getItem("token");

        const res = await API.get(

            "/orders",

            {

                headers: {

                    Authorization:

                        `Bearer ${token}`

                }

            }

        );

        setOrders(res.data);

    }

    catch (error) {

        console.log(error);

    }

};

    useEffect(() => {

        loadProducts();
        loadOrders();

    }, []);

    return (

        <div>

            <h1>

                Admin Dashboard

            </h1>

            <h2>

    Add Product

</h2>

<input

    type="text"

    placeholder="Title"

    value={title}

    onChange={(e)=>

        setTitle(

            e.target.value

        )

    }

/>

<br /><br />

<input

    type="text"

    placeholder="Description"

    value={description}

    onChange={(e)=>

        setDescription(

            e.target.value

        )

    }

/>

<br /><br />

<input

    type="number"

    placeholder="Price"

    value={price}

    onChange={(e)=>

        setPrice(

            e.target.value

        )

    }

/>

<br /><br />

<input

    type="text"

    placeholder="Category"

    value={category}

    onChange={(e)=>

        setCategory(

            e.target.value

        )

    }

/>

<br /><br />

<input

    type="number"

    placeholder="Stock"

    value={stock}

    onChange={(e)=>

        setStock(

            e.target.value

        )

    }

/>

<br /><br />

{

    editId ?

    <button

        onClick={updateProduct}

    >

        Update Product

    </button>

    :

    <button

        onClick={createProduct}

    >

        Add Product

    </button>

}
<hr />

<h2>

    Products

</h2>

{

    products.map(product=>(

        <div key = {product._id}>

            <h3>

                {product.title}

            </h3>

            <p>

                ₹ {product.price}

            </p>

            <button

                onClick={()=>

                    editProduct(product)

                }

            >

                Edit

            </button>

            <button

                onClick={()=>

                    deleteProduct(product._id)

                }

            >

                Delete

            </button>

        </div>

    ))

}

<hr />

<h2>Orders</h2>

{

    orders.map(order => (

        <div
            key={order._id}
            style={{
                border: "1px solid black",
                margin: "20px",
                padding: "20px"
            }}
        >

            <h3>

Customer

</h3>

<p>

{order.user.name}

</p>

<p>

{order.user.email}

</p>

<p>

₹ {order.totalAmount}

</p>

            <p>

                Status : {order.status}

            </p>

            <select

                value={order.status}

                onChange={(e) =>

                    updateOrderStatus(

                        order._id,

                        e.target.value

                    )

                }

            >

                <option value="Pending">

                    Pending

                </option>

                <option value="Shipped">

                    Shipped

                </option>

                <option value="Delivered">

                    Delivered

                </option>

            </select>

        </div>

    ))

}
        </div>

    );

}

export default AdminDashboard;