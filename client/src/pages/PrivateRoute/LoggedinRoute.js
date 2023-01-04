import {useSelector} from 'react-redux'
import {Navigate, Outlet} from 'react-router-dom'
/**
 * User Loggedin route
 */
const LoggedinRoute = () => {
    const {loginStatus} = useSelector(state => state.auth)

    return loginStatus ?  <Outlet /> : <Navigate  to="/login"/>
}

// export
export default LoggedinRoute;