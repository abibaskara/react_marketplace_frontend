import React, {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const Register = () => {
    const options = [
        {value: "Male", label: "Male"},
        {value: "Female", label: "Female"}
    ];

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Daftar = async(e) => {
        e.preventDefault();
        try {
            console.log(gender)
            await axios.post('http://localhost:5000/users', {
                name: name,
                id_employee: 1,
                email: email,
                password: password,
                confPassword: confPassword,
                gender: gender,
            });
            navigate('/')
        } catch (error) {
            if(error.response) {
                setMsg(error.response.data.message)
            }
        }
    }

    const handleChange  = (event) => {
        setGender(event.value)
    };

    return (
        <div className="authentication">    
        <div className="container">
            <div className="row">
            <div className="col-lg-4 col-sm-12">
                <form onSubmit={ Daftar } className="card auth_form">
                    <div className="header">
                        <img className="logo" src="assets/images/logo.svg" alt />
                        <h5>Sign Up</h5>
                        <span>Register a new membership</span>
                    </div>
                    <div className="body">
                        <p className='label' style={{textAlign:'center'}}>{msg}</p>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Enter Name" value={name} onChange={ (e) => setName(e.target.value)}/>
                            <div className="input-group-append">
                                <span className="input-group-text"><i className="zmdi zmdi-account" /></span>
                            </div>
                        </div>    
                        <div className="input-group mb-3">
                            <Select options={options} value={gender} className="form-control" onChange={event => handleChange(event)}  isClearable={true}  ></Select>
                            <div className="input-group-append">
                                <span className="input-group-text"><i className="zmdi zmdi-male-female" /></span>
                            </div>
                        </div>     
                        <div className="input-group mb-3">
                            <input type="email" className="form-control" placeholder="Enter Email" value={email} onChange={ (e) => setEmail(e.target.value)}/>
                            <div className="input-group-append">
                                <span className="input-group-text"><i className="zmdi zmdi-email" /></span>
                            </div>
                        </div>                        
                        <div className="input-group mb-3">
                            <input type="password" className="form-control" placeholder="Password" value={password} onChange={ (e) => setPassword(e.target.value)} />
                            <div className="input-group-append">                                
                                <span className="input-group-text"><i className="zmdi zmdi-lock" /></span>
                            </div>                            
                        </div>
                        <div className="input-group mb-3">
                            <input type="password" className="form-control" placeholder="Confirm Password" value={confPassword} onChange={ (e) => setConfPassword(e.target.value)} />
                            <div className="input-group-append">                                
                                <span className="input-group-text"><i className="zmdi zmdi-lock" /></span>
                            </div>                            
                        </div>
                        <div className="checkbox">
                        <input id="remember_me" type="checkbox" />
                        <label htmlFor="remember_me">I read and agree to the <a href="javascript:void(0);">terms of usage</a></label>
                        </div>
                        <button type='submit' className="btn btn-primary btn-block waves-effect waves-light">SIGN UP</button>
                        <div className="signin_with mt-3">
                            <Link to={'/'}>You already have a membership?</Link>
                        </div>
                    </div>
                </form>
                <div className="copyright text-center">
                ©
                ,
                <span>Designed by <a href="#" target="_blank">Abi Baskara A</a></span>
                </div>
            </div>
            <div className="col-lg-8 col-sm-12">
                <div className="card">
                <img src="assets/images/signup.svg" alt="Sign Up" />
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}

export default Register