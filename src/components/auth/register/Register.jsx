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
            register <br/>
            <form onSubmit={onSubmit}>
           <input name="email" placeholder="Email" type="text" onChange={onChange} /> <br/>
           <input name="moreData" placeholder="moreData" type="text" onChange={onChange} /> <br/>
           <input name="addional" placeholder="addional" type="text" onChange={onChange} /> <br/>
           <input name="password" placeholder="password" type="password" onChange={onChange} /> <br/>
           <input name="repeatPassword" placeholder="repeatPassword" type="password" onChange={onChange} /> 
           <button className={loading? 'loading': ''} >Register</button>
           </form>
        </div>
    )
}


export default connect(mapState, actions)(Register)