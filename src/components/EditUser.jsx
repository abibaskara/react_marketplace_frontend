import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditUser = () => {

    const options = [
        {value: "Male", label: "Male"},
        {value: "Female", label: "Female"}
    ];

    const Token = localStorage.getItem('token');

    const[name, setName] =useState("");
    const[email, setEmail] =useState("");
    const[gender, setGender] =useState(options[0]);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        getUserById();
    }, []);

    const updateUser = async(e) => {
        e.preventDefault();
        var genders = gender.value
        console.log(genders)
        var id_employee = 1;
        try{
            if(!Token) {
                navigate('/');
            } else {
                await axios.patch(`http://localhost:5000/users/${id}`, {
                    id_employee,
                    name, 
                    email,
                    gender: genders
                }, {
                    headers: {
                        Authorization: `Bearer ${Token}`
                    }
                }).then((result) => {
                    if(result.status == 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Update Data User',
                            timer: 1500,
                            showConfirmButton: false,
                        }).then(function() {
                            navigate('/users');
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Update Data User',
                            timer: 1500,
                            showConfirmButton: false,
                        })
                    }
                });
            }
        } catch(error) {
            console.log(error);
        }
    }

    const animatedComponents = makeAnimated();

    const getUserById = async () => {
        if(!Token) {
            navigate('/');
        } else {
            const response = await axios.get(`http://localhost:5000/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${Token}`,
                }
            });
            setName(response.data.name);
            setEmail(response.data.email);
            if(response.data.gender == "Male") {
                setGender(options[0]);
            } else {
                setGender(options[1]);
            }
        }
    }

    const handleChange  = (event) => {
        console.log(event)
        if(event == "Male") {
            setGender(options[0])
        } else {
            setGender(options[1])
        }
    };

    return (
        <section className="content">
            <div className="body_scroll">
                <div className="block-header">
                <div className="row">
                    <div className="col-lg-7 col-md-6 col-sm-12">
                    <h2>Edit User</h2>
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={`/`}><i className="zmdi zmdi-home" /> Dashboard</Link></li>
                        <li className="breadcrumb-item"><Link to={`../users`}> User</Link></li>
                        <li className="breadcrumb-item active">Edit User</li>
                    </ul>
                    <button className="btn btn-primary btn-icon mobile_menu" type="button"><i className="zmdi zmdi-sort-amount-desc" /></button>
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-12">                
                    <button className="btn btn-primary btn-icon float-right right_icon_toggle_btn" type="button"><i className="zmdi zmdi-arrow-right" /></button>
                    </div>
                </div>
                </div>
                <div className="container-fluid">
                <div className="row clearfix">
                    <div className="col-lg-12">
                    <div className="card">
                        <div className="header">
                        <h2><strong>Edit</strong> User</h2>
                        </div>
                        <div className="body">
                        <h5>Edit Data User</h5>
                        <form onSubmit={updateUser}>
                            <div className="field">
                                <label className="label">Name</label>
                                <div className="control">
                                    <input type="text" className='input' value={name} onChange= {(e) => setName(e.target.value)} placeholder='Name' />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control">
                                    <input type="email" className="input" value={email} onChange= {(e) => setEmail(e.target.value)} placeholder='Email' />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Gender</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <Select options={options} value={gender} onChange= {(e) => handleChange(e.value)} isClearable={true} components={animatedComponents}  ></Select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <button type='submit' className='button is-success'>Update</button> 
                                <Link to={`../users`} style={{marginLeft:'10px'}}><button type='button' className='button is-secondary'>Back</button></Link>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}

export default EditUser;