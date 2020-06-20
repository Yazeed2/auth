import React, { useState } from 'react'
import {register} from '../../../firebase/auth'
import {alertError, alertSuccess} from '../../alerts/alerts'
import {passwordDoesntMatch, requiredFields} from '../../alerts/Messages/error'
import {connect} from 'react-redux'; 
import {setUserInfoAction} from '../authActions'
import { useHistory } from 'react-router-dom'



const mapState = (state) => ({
    data : state.auth
})
const actions = {
    setUserInfoAction
}

function Register(props) {
    let history = useHistory()
    const [userInfo, setUserInfo] = useState({})
    const [loading, setLoading] = useState(false)
    const onChange = (e) => {
        setUserInfo({...userInfo, [e.target.name]:e.target.value})
    }
    console.log(props );
    
    const required = ['email', 'password', 'repeatPassword'] // add your required fields
    const onSubmit = async(e) => {
        e.preventDefault()

        let missingFields = []
        required.forEach(field => {
           if(!userInfo[field]) missingFields.push(field)
        })
        if(missingFields.length === 0){
            if(userInfo.password === userInfo.repeatPassword){
                setLoading(true)
                try{
                    let user = await register(userInfo)
                    props.setUserInfoAction(user)
                    history.push('/')
                }catch { 

                }
                setLoading(false)
            }else{
                alertError(passwordDoesntMatch);
            }
        }else{ 
            //error missig elements are
            alertError(requiredFields);
        }
    }

    
    return (
        <div>
            <h1>Register</h1>
             

            <form onSubmit={onSubmit}>
           <input name="email" placeholder="Email" type="text" onChange={onChange} /> 
           <input name="moreData" placeholder="Name" type="text" onChange={onChange} /> 
           <input name="addional" placeholder="Addional" type="text" onChange={onChange} /> 
           <input name="password" placeholder="Password" type="password" onChange={onChange} /> 
           <input name="repeatPassword" placeholder="Repeat password" type="password" onChange={onChange} /> 
           <button className={loading? 'loading': ''} >Register</button>
           </form>
        </div>
    )
}


export default connect(mapState, actions)(Register)