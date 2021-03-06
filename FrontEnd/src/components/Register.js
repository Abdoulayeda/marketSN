/**
    * @description      : 
    * @author           : aliou
    * @group            : 
    * @created          : 14/04/2022 - 18:25:38
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/04/2022
    * - Author          : aliou
    * - Modification    : 
**/
import React, { useState } from 'react'
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [telephone, setTelephone] = useState('');
    const [msg, setMsg] = useState('');
    const history = useHistory();

    const Register = async (e) => {   
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/register', {
                email: email,
                password: password,
                confPassword: confPassword,
                telephone: telephone,
            });
            history.push("/");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={Register} className="box">
                                <p className="has-text-centered">{msg}</p>
                                
                                <div className="field mt-5">
                                    <label className="label">Email</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Telephone</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Name"
                                            value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Confirm Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register
