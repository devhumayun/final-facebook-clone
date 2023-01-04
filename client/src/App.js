import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home';
import './assets/css/style.css'
import './assets/css/Custom.css'
import Profile from './pages/Profile/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FindAccount from './pages/Auth/FindAccount/FindAccount';
import Forgot from './pages/Auth/Forgot/Forgot';
import Activation from './pages/Auth/Activation/Activation';
import Password from './pages/Auth/Password/Password';
import Account from './pages/Auth/Account/Account';
import LoadingBar from 'react-top-loading-bar'
import { useDispatch, useSelector } from 'react-redux';
import { LOADER_END } from './redux/loader/loaderTypes';
import { Authenticate } from './pages/PrivateRoute/Authenticate';
import { AuthReject } from './pages/PrivateRoute/AuthReject';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { tokenUser } from './redux/auth/action';
import LoginPage from './pages/Auth/LoginPage/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage/RegisterPage';
import Friends from './pages/Friends/Friends';
import LoggedOutRoute from './pages/PrivateRoute/LoggedOutRoute';
import LoggedinRoute from './pages/PrivateRoute/LoggedinRoute';

function App() {

  const loaderDispatch = useDispatch()
  const loader = useSelector(state => state.loader)

  // get auth token
  const token = Cookies.get("authToken")
  // token user dispatch
  const tokenDispatch = useDispatch()

 useEffect(() => {
    if(token){
      tokenDispatch(tokenUser(token))
    }
 },[tokenDispatch])
 
  return (
    <>
      <LoadingBar
        color='#1876F2'
        progress= {loader}
        onLoaderFinished = {() => loaderDispatch({type : LOADER_END})}
      />
     <ToastContainer
        style={{ zIndex : 99999999 }}
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>

          <Route path='/' element = { <Home /> } />

          <Route element={ <LoggedOutRoute /> }>
            <Route path='/login' element = { <LoginPage /> } />
            <Route path='/register' element = {<RegisterPage /> } />
          </Route>

          <Route element={ <LoggedinRoute /> }>
            <Route path='/profile' element = {<Profile /> } />
            <Route path='/friends' element = {<Friends /> } />
          </Route>

          <Route path='/activation/:type' element = {<Activation /> } />
          <Route path='/forgot-password' element = {<Forgot /> } />
          <Route path='/find-account' element = {<FindAccount /> } />
          <Route path='/password-reset' element = {<Password /> } />
          <Route path='/account' element = {<Account /> } />
          
      </Routes>
    </>
    
  )
  
}

export default App;
