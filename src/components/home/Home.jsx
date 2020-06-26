import React from 'react'
import {connect} from 'react-redux'
import {getUserInfo} from '../../firebase/auth'

const mapState =(state)=> ({userInfo: state.auth.userInfo})
const Home = (props) => {
    const {userInfo} = props
    
    return (
        <div>
            
    {userInfo !=undefined? <>
        email: {userInfo.email} <br/> 
        uid : {userInfo.uid}
     </>: 'please login or register'} 
            <button onClick={getUserInfo}>click me</button>
        </div>
    )
}

export default connect(mapState)(Home)
