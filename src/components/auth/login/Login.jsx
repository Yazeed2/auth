import React, {useState}from 'react'
import {alertError} from '../../alerts/alerts'
import {loginInfoMissing} from '../../alerts/Messages/error'
import {login} from '../../../firebase/auth'
import Loading from '../../loading/Loading'
import {useHistory} from 'react-router-dom';

export default function Login() {
 let history = useHistory()   
 const [userInfo, setUserInfo] = useState({})
 const [loading, setLoading] = useState(false)
 const onFeildChange = (e)=> {
    setUserInfo({...userInfo, [e.target.name]: e.target.value})
 }
 const onSubmit = async(e) => { 
     e.preventDefault();
    if(userInfo.password && userInfo.email){ 
        setLoading(true)
        try{
            await login(userInfo);
            history.push('/')
        }catch { 

        }
        setLoading(false)
    }else{
        alertError(loginInfoMissing)
    }
 }
    return (
        <div>
            login 
            {loading? <Loading/>: ''}
            <form onSubmit={onSubmit} >
           <input onChange={onFeildChange} name="email" placeholder="Email" type="email"/> <br/>
            <input onChange={onFeildChange} name="password" placeholder="password" type="password"/> <br/>
            <button className={loading? 'loading': ''} >login</button>
            </form>

        </div>
    )
}



