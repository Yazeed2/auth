import React,{useState, useEffect} from 'react'
import './navbar.css'
import ClickOutSide from './ClickOutSide'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {signOut} from '../../firebase/auth'

const mapState = (state) =>({...state})


const Header = (props) => {
  console.log(props);

    const [menu, setMenu] = useState('')
    const [wait, setWait] = useState(false)
    var options 
 
    const onMenuClick= () => {
      if(!wait){
        setWait(true)
        if(menu == '' || menu === 'animateBack') {
          setMenu('animate')
          setWait(false)
        }else{ 
          setMenu('animateBack')
         setTimeout(() => {
           setWait(false)
         }, 450);
         
        }

      }
      }
    return <div className="header">

    <div onClick={menu == 'animate'? '': onMenuClick} className="burgerMenue">
        <div className={"rect a " + menu }></div>
        <div className={"rect b " + menu}></div>
        <div className={"rect c " + menu}></div>
    </div>


    <ClickOutSide menu={menu} onMenuClick={onMenuClick}>

          <ul  className={"options "+ menu} style={{display: menu == 'animateBack'&& wait == false? 'none':''}} >
            <li>
              <Link to="/">Home</Link>
            </li>
            {props.auth.userInfo?
            <button onClick={()=>signOut(props.setUserInfoAction)}>Logout</button>
            :
            <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            </>
            }
            
          </ul>


    </ClickOutSide>

    
    </div>
}

export default connect(mapState)(Header) ;