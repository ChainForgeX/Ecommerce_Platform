import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const role = localStorage.getItem("role");

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("role");

        alert("Logged Out Successfully");

        navigate("/login");

    };

    return (

        <nav>

            <Link to="/">

                Home

            </Link>

            {" | "}

            {

                !token ?

                <>

                    <Link to="/login">

                        Login

                    </Link>

                    {" | "}

                    <Link to="/register">

                        Register

                    </Link>

                </>

                :

                role === "admin" ?

                <>

                    <Link to="/admin">

                        Admin Dashboard

                    </Link>

                    {" | "}

                    <button
                        onClick={logout}
                    >

                        Logout

                    </button>

                </>

                :

                <>

                    <Link to="/cart">

                        Cart

                    </Link>

                    {" | "}

                    <Link to="/orders">

                        Orders

                    </Link>

                    {" | "}

                    <button
                        onClick={logout}
                    >

                        Logout

                    </button>

                </>

            }

        </nav>

    );

}

export default Navbar;