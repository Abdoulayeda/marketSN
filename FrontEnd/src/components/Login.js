/**
    * @description      : 
    * @author           : aliou
    * @group            : 
    * @created          : 15/04/2022 - 02:16:15
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/04/2022
    * - Author          : aliou
    * - Modification    : 
**/
import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useHistory();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/login', {
                email: email,
                password: password
            });
            history.push("/dashboard");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }  
        }
    }

    return (

        <div>

            <div className="container col-lg-6">
                <h1>Connexion</h1>
                <form onsubmit={Auth} className="form-group">
                  <label>Email</label>
                  <input type="email" className="form-control" value={email} onChange={(e) =>setEmail(e.target.value)} placeholder="votre adresse email"/>
                  <label>Password</label>
                  <input type="password" className="form-control" value={password} onChange={(e) =>setPassword(e.target.value)} placeholder="votre mot de passe"/>
                  <button className="btn btn-primary mt-3">Connecter</button>
                </form>

            </div>
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={Auth} className="box">
                                <p className="has-text-centered">{msg}</p>
                                <div className="field mt-5">
                                    <label className="label">Email or Username</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        </div>
    )
}

export default Login
