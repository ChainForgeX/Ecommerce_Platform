import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function ecommercelogin() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const loginUser = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post(

                "/auth/login",

                {

                    email,

                    password

                }

            );

            localStorage.setItem(

                "token",

                res.data.token

            );
            localStorage.setItem("role", res.data.role);

            alert(

                res.data.message

            );

            if (res.data.role === "admin") {

    navigate("/admin");

} else {

    navigate("/");

}

        }

        catch (error) {

            alert(

                error.response.data.message

            );

        }

    };

    return (

        <div>

            <h2>

                Login

            </h2>

            <form onSubmit={loginUser}>

                <input

                    type="email"

                    placeholder="Email"

                    value={email}

                    onChange={(e)=>

                        setEmail(

                            e.target.value

                        )

                    }

                />

                <br /><br />

                <input

                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={(e)=>

                        setPassword(

                            e.target.value

                        )

                    }

                />

                <br /><br />

                <button>

                    Login

                </button>

            </form>

        </div>

    );

}

export default ecommercelogin;