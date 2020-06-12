import {SETUSERINFO} from './authConstants'; 
import {createReduser} from '../../store/reducers/reducerUtils'; 

const initialState = {}

const setUserInfo = (state, payload) => {
    return {...state, userInfo: payload}; 
}

export default createReduser(initialState, {
    [SETUSERINFO]: setUserInfo
})