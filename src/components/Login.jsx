import axios from 'axios';
import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Login = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            }).then(res => {
                localStorage.setItem('token', res.data.refreshToken);
            });
            navigate('/dashboard');
        } catch (error) {
            if(error.response) {
                setMsg(error.response.data.message);
            }
        }
    }

    return (
        <div className="authentication">
            <div className="container">
                <div className="row">
                <div className="col-lg-4 col-sm-12">
                    <form onSubmit={Login} className="card auth_form">
                        <div className="header">
                            <img className="logo" src="assets/images/logo.svg" alt />
                            <h5>Log in</h5>
                        </div>
                        <div className="body">
                            <p className='label' style={{textAlign:'center'}}>{msg}</p>
                            <div className="input-group mb-3">
                            <input type="email" className="form-control" placeholder="Email" value={email} onChange={ (e) => setEmail(e.target.value)} />
                            <div className="input-group-append">
                                <span className="input-group-text"><i className="zmdi zmdi-account-circle" /></span>
                            </div>
                            </div>
                            <div className="input-group mb-3">
                            <input type="password" className="form-control" placeholder="Password" value={password} onChange={ (e) => setPassword(e.target.value)} />
                            <div className="input-group-append">                                
                                <span className="input-group-text"><a href="forgot-password.html" className="forgot" title="Forgot Password"><i className="zmdi zmdi-lock" /></a></span>
                            </div>                            
                            </div>
                            <div className="checkbox">
                            <input id="remember_me" type="checkbox" />
                            <label htmlFor="remember_me">Remember Me</label>
                            </div>
                            <button type='submit' className="btn btn-primary btn-block waves-effect waves-light">SIGN IN</button>                        
                            <div className="signin_with mt-3">
                            <p className="mb-0">or <Link to={'/register'}>Sign Up</Link> </p>
                            </div>
                        </div>
                    </form>
                    <div className="copyright text-center">
                    ©
                    ,
                    <span>Designed by <a href="#" target="_blank">Abi Baskara Atthallah</a></span>
                    </div>
                </div>
                <div className="col-lg-8 col-sm-12">
                    <div className="card">
                    <img src="assets/images/signin.svg" alt="Sign In" />
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Login