import { ActionType } from "./actionType"

function incre (){
    return{
        type:ActionType.INCREMENT
    }
} 

function decre (){
    return{
        type: ActionType.DECREMENT
    }
}

export function incrementAction (){
    return(dispatch) => {
        dispatch(incre())
    }
}

export function decrementAction (){
    return(dispatch)=> {
        dispatch(decre())
    }
}