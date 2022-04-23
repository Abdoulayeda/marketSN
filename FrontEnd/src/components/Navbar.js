/**
    * @description      : 
    * @author           : aliou
    * @group            : 
    * @created          : 19/04/2022 - 02:49:35
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 19/04/2022
    * - Author          : aliou
    * - Modification    : 
**/
import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const Navbar = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');

   
    useEffect(() => {
      refreshToken();
  }, []);

  const refreshToken = async () => {
      try {
          const response = await axios.get('http://localhost:5000/api/token');
          setToken(response.data.accessToken);
          const decoded = jwt_decode(response.data.accessToken);
          setEmail(decoded.email);
          setExpire(decoded.exp);
      } catch (error) {
          if (error.response) {
             
          }
      }
  }
  
  const axiosJWT = axios.create();
  
  axiosJWT.interceptors.request.use(async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
          const response = await axios.get('http://localhost:5000/api/token');
          config.headers.Authorization = `Bearer ${response.data.accessToken}`;
          setToken(response.data.accessToken);
          const decoded = jwt_decode(response.data.accessToken);
          setEmail(decoded.email);
          setExpire(decoded.exp);
      }
      return config;
  }, (error) => {
      return Promise.reject(error);
  });

    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/api/logout');
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (


   <div>



<header>
      <div className="navbar-sticky">
          <div className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
              <div className="navbar-brand d-none d-sm-block me-4 order-lg-1">
              SOPSN
            </div>
              <div className="navbar-brand d-sm-none me-2 order-lg-1">
                SOPSN   
              </div>
              <div className="navbar-toolbar d-flex align-items-center order-lg-3">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-tool d-none d-lg-flex" href="javascript:void(0)" data-bs-toggle="collapse" data-bs-target="#searchBox" role="button" aria-expanded="false" aria-controls="searchBox">
                 
                </a>
              </div>
              <div class="collapse navbar-collapse me-auto order-lg-2" id="navbarCollapse">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link " href="/" >Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link " href="/register" >Register</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link " href="/login">Login</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link " href="/dashboard">Dashboard</a>
                  </li>
                 

                   {(email != "") ?(
                     <li className="nav-item">
                     <button onClick={Logout} className="btn btn-danger">LogOut</button>
                     </li>
                   ):('') }  
                 



             
                 
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>







   </div>



       
    )
}

export default Navbar
