export const initialState = {
    profile:null,
    pageReload: null,
    error:false,
    completeOrder:null,
    incompleteOrders:null
}
const reducer = (state,action)=>{
    switch(action.type){
        case "ADD_PROFILE":
            return{
                ...state,
                profile:action.profile
            }
        case "RELOAD_PAGE":
            return {
                ...state,
                pageReload:action.pageReload
            }
        case "ERROR_OCCURED":
            return{
                ...state,
                error: action.error
            }
        case "ADD_COMPLETE_CART":
            return {
                ...state,
                completeOrder:action.completeOrder
            }
        case "ADD_INCOMPLETE_CART":
            return {
                ...state,
                incompleteOrders:action.incompleteOrders
            }
        default:
            return state;

    }
}
export default reducer;