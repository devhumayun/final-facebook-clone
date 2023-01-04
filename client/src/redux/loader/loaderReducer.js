import { loaderInitial } from "./initialState";
import { LOADER_END, LOADER_START } from "./loaderTypes";

// loader reducer
export const loaderReducer = ( state = loaderInitial, { type, payload } ) => {
    switch (type) {
        case LOADER_START :
            return 100
            
        case LOADER_END : 
            return 0   
    
        default:
            return state
    }
}