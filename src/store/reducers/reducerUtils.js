export const createReduser = (initialState, fnMap) => { 
    return (state = initialState, {payload, type})=> {
        const handler = fnMap[type]
        return handler? handler(state, payload): state
    }
}