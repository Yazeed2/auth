import React from 'react'
import {connect} from 'react-redux'

const mapState =(state)=> ({userInfo: state.auth.userInfo})
const Home = ({userInfo}) => {
    
    return (
        <div>
            
    {userInfo !=undefined? <>
        email: {userInfo.email} <br/> 
        uid : {userInfo.uid}
     </>: 'please login or register'} 
            
        </div>
    )
}

export default connect(mapState)(Home)
