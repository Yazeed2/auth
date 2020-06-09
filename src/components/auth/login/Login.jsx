import React, {useState}from 'react'

export default function Login() {

 const [state, setstate] = useState(0)
    return (
        <div>
            login <br/>
           <input name="Email" placeholder="Email" type="text"/> <br/>
            <input name="password" placeholder="password" type="password"/> <br/>
            <button>Login</button>

        </div>
    )
}



