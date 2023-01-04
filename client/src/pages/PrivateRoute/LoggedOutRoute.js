import {useSelector} from 'react-redux'
import {Navigate, Outlet} from 'react-router-dom'
/**
 * User Logged out route
 */
const LoggedOutRoute = () => {
    const {loginStatus} = useSelector(state => state.auth)
    return loginStatus ?  <Navigate  to="/"/> : <Outlet />
}

// export
export default LoggedOutRoute;