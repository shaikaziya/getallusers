import axios from 'axios'


export const asyncGetUsers = () => {
    return((dispatch) => {
        axios.get('https://63650a617b209ece0f558d28.mockapi.io/userinfo')
        .then((response) => {
            const result = response.data
            dispatch(getUserAction(result))
           
        })
        .catch((error) => {
            console.log(error.message)
            // alert(error.message)
        })
    })
}
export const getUserAction = (result) => {

    return {
        type : 'GET_USERS',
        payload : result

    }
}

export const asyncRemoveUser = (id) => {

    return((dispatch) => {
        axios.delete(`https://63650a617b209ece0f558d28.mockapi.io/userinfo/${id}`) 
        .then((response) => {
            const result = response.data
            dispatch(removeUser(result))
            
        })
        .catch((error) => {
            alert(error.message)
        })
    })
}

export const removeUser = (result) => {
    return{
        type : 'REMOVE_USERS',
        payload : result
    }
}




