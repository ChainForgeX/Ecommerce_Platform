import { useState } from "react";
import API from "../services/api";

function ecommerceregister() {

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const registerUser = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post(

                "/auth/register",

                {

                    name,

                    email,

                    password

                }

            );

            alert(res.data.message);

            setName("");
            setEmail("");
            setPassword("");

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

                Register

            </h2>

            <form onSubmit={registerUser}>

                <input

                    type="text"

                    placeholder="Name"

                    value={name}

                    onChange={(e)=>

                        setName(

                            e.target.value

                        )

                    }

                />

                <br /><br />

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

                    Register

                </button>

            </form>

        </div>

    );

}

export default ecommerceregister;