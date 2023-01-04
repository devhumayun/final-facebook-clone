import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
/**
 * Auth Rejects system
 */
export const AuthReject = ({children}) => {
    const {loginStatus} = useSelector(state => state.auth)

    return loginStatus ?  <Navigate to="/" /> : children
}

