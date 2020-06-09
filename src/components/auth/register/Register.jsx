import React, { useState } from 'react'
import {register} from '../../../firebase/auth'


export default function Register() {
    const [state, setState] = useState({})

    const onChange = (e) => {
        setState({...state, [e.target.name]:e.target.value})
    }
    const required = ['email', 'password', 'repeatPassword']
    const onSubmit = () => {
        let missingElements = []
        required.forEach(element => {
           if(state[element]) missingElements.push(element)
        })
        if(missingElements.length){
            if(state.password === state.repeatPassword){
                register(state.email, state.password)
            }else{
                // error password does not match
            }
        }else{ 
            //error missig elements are
            alert('nope') // change this later pls :) 
        }
    }
    return (
        <div>
            register <br/>
           <input name="email" placeholder="Email" type="text" onChange={onChange} /> <br/>
           <input name="moreData" placeholder="moreData" type="text" onChange={onChange} /> <br/>
           <input name="addional" placeholder="addional" type="text" onChange={onChange} /> <br/>
           <input name="password" placeholder="password" type="password" onChange={onChange} /> <br/>
           <input name="repeatPassword" placeholder="repeatPassword" type="password" onChange={onChange} /> 
            <button onClick={onSubmit}>Submit</button>
        </div>
    )
}


