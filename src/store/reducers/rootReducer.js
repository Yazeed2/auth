import {combineReducers} from 'redux'
import authReducer from '../../components/auth/authReducers'

const rootReducer = combineReducers({
    auth: authReducer
})
export default rootReducer; 