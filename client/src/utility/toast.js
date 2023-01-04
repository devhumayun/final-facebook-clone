import { toast } from 'react-toastify';

// create a toast
export const createToast = ( message, type= "error" ) => {

    switch (type) {
        case 'error':
            toast.error(message)
            break;
        
        case 'success':
            toast.success(message)
            break;

        case 'danger':
            toast.danger(message)
            break;
    
        default:
            break;
    }

}