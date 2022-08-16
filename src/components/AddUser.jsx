import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddUser = () => {

    const options = [
        {value: "Male", label: "Male"},
        {value: "Female", label: "Female"}
    ];
    
    const Token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [option_emp, setOptionEmp] = useState([]);
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState('');
    const [id_employee, setIdEmployee] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    
    useEffect(() => {
        getEmployee();
    }, [])

    const getEmployee = async() => {
        if(!Token) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'You Must Login!',
                timer: 1500,
                showConfirmButton: false,
            }).then(function() {
                navigate('/')
            })
        } else {
            const response = await axios.get('http://localhost:5000/employee', {
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            })
            
            setOptionEmp(response.data.map((val) => (
                    {
                        value: val.id_employee, label: val.name_employee,
                    }
                )
            ));
        }
    }



    const saveUser = async(e) => {
        e.preventDefault();
        var genders = gender.value;
        var get_id = id_employee.value;
        var get_name = id_employee.label;
        try{
            await axios.post('http://localhost:5000/users', {
                name: get_name,
                id_employee: get_id,
                email: email,
                password: password,
                confPassword: confPassword,
                gender: genders,
                
            }, {
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            }).then((result) => {
                if(result.status == 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Create Data User',
                        timer: 1500,
                        showConfirmButton: false,
                    }).then(function() {
                        navigate('../users');
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Add User',
                        timer: 1500,
                        showConfirmButton: true,
                    })
                }
            });
        } catch(error) {
            if(error.response.status == 400) {
                Swal.fire({
                    icon : 'error',
                    title: 'Error!',
                    text: error.response.data.message,
                    timer: 1500,
                    showConfirmButton: false
                })
            } else {
                Swal.fire({
                    icon : 'error',
                    title: 'Error!',
                    text: 'Cek Koneksi Server!',
                    timer: 1500,
                    showConfirmButton: false
                })
            }
        }
    };

    const animatedComponents = makeAnimated();

    

    const handleChange  = (event) => {
        setGender(event)
    };

    return (
        <section className="content">
            <div className="body_scroll">
                <div className="block-header">
                <div className="row">
                    <div className="col-lg-7 col-md-6 col-sm-12">
                    <h2>Tambah Data User</h2>
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home" /> Dashboard</a></li>
                        <li className="breadcrumb-item"><Link to={`../users`}>Data User</Link></li>
                        <li className="breadcrumb-item active">Tambah Data User</li>
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
                        <h2><strong>Tambah</strong> User</h2>
                        </div>
                        <div className="body">
                        <h5>Tambah Data User</h5>
                            <form onSubmit={saveUser}>
                                <div className="field">
                                    <label className="label">Name</label>
                                    <div className="control">
                                        <Select options={option_emp} value={id_employee} onChange={event => setIdEmployee(event)}  isClearable={true} components={animatedComponents} required placeholder={'Name'}  ></Select>
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

                                            <Select options={options} value={gender} onChange={event => handleChange(event)}  isClearable={true} components={animatedComponents} required placeholder={'Select Gender...'} ></Select>
                                        </div>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control">
                                        <input type="password" className="input" value={password} onChange= {(e) => setPassword(e.target.value)} placeholder='*********' />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Confirm Password</label>
                                    <div className="control">
                                        <input type="password" className="input" value={confPassword} onChange= {(e) => setConfPassword(e.target.value)} placeholder='*********' />
                                    </div>
                                </div>
                                <div className="field">
                                    <button type='submit' className='button is-success'>Simpan</button>
                                    <Link to={'../users'}><button type='button' className='button is-secondary'>Back</button></Link>
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

export default AddUser