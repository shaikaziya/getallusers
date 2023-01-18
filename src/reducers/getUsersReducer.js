const userInitialState=[]

const userReducer=((state=userInitialState,action)=>{

    switch(action.type){
        case "GET_USERS":
            return [...action.payload];

        case "REMOVE_USERS":
            return state.filter((ele) => {
                return ele.id !== action.payload.id
            })
        
       
        default : {
            return [...state]
        }
    }

})

export default userReducer