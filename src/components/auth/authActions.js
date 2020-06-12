import {SETUSERINFO} from './authConstants';

export const setUserInfoAction = (userInfo) => {
    return {
        type:  SETUSERINFO,
        payload: userInfo
    }
}