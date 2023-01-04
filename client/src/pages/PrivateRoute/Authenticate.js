import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
/**
 * Auth Rejects system
 */
export const Authenticate = ({children}) => {
    const {loginStatus} = useSelector(state => state.auth)

    return loginStatus ?  children : <Navigate  to="/login"/>
}